<template>
  <!-- Icon preloader - hidden div to cache icons on mount -->
  <div v-if="!iconsPreloaded" class="icon-preloader">
    <Icon name="pixelarticons:arrow-right" />
    <Icon name="pixelarticons:human-handsup" />
    <Icon name="pixelarticons:scale" />
    <Icon name="pixelarticons:viewport-narrow" />
  </div>

  <motion.div ref="elementRef" class="pointer-follower"
    :class="[`pointer-${currentState}`, { 'pointer-hidden': !isVisible }]" :style="{ x, y }">
    <!-- Default pointer -->
    <div v-if="currentState === 'default'"
      class="pointer-default backdrop-blur-[1.5px] border border-bubbles text-[#5757573b]"></div>

    <!-- Button pointer -->
    <div v-else-if="currentState === 'button'" class="pointer-button">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>

    <!-- Link pointer -->
    <div v-else-if="currentState === 'link'" class="pointer-link">
      <Icon name="pixelarticons:arrow-right" class="min-h-10 min-w-10 text-boss" />
    </div>
    <div v-else-if="currentState === 'contact'" class="pointer-link">
      <Icon name="pixelarticons:human-handsup" class="min-h-10 min-w-10 text-boss" />
    </div>
    <div v-else-if="currentState === 'site'" class="pointer-link">
      <Icon name="pixelarticons:arrow-right" class="min-h-10 min-w-10 text-boss -rotate-45" />
    </div>
    <div v-else-if="currentState === 'open'" class="pointer-link">
      <Icon name="pixelarticons:scale" class="min-h-10 min-w-10 text-boss" />
    </div>
    <div v-else-if="currentState === 'close'" class="pointer-link">
      <Icon name="pixelarticons:viewport-narrow" class="min-h-10 min-w-10 text-boss" />
    </div>

    <!-- Image pointer -->
    <div v-else-if="currentState === 'image'" class="pointer-image">
      VIEW
    </div>

    <!-- Text pointer -->
    <div v-else-if="currentState === 'text'" class="pointer-text font-doto">
      {{ customText }}
    </div>
  </motion.div>
</template>

<script setup>
import { frame, motion, useMotionValue, useSpring } from "motion-v"
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue"

// Props
const props = defineProps({
  size: {
    type: [Number, String],
    default: 20
  },
  color: {
    type: String,
    default: '#ff0088'
  },
  damping: {
    type: Number,
    default: 5
  },
  stiffness: {
    type: Number,
    default: 100
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'square', 'rounded'].includes(value)
  },
  offsetX: {
    type: Number,
    default: 15
  },
  offsetY: {
    type: Number,
    default: 15
  }
})

// State
const currentState = ref('default')
const customText = ref('Click me!')
const isVisible = ref(true)
const currentHoveredElement = ref(null)
const iconsPreloaded = ref(false)

// Spring config based on props
const springConfig = computed(() => ({
  damping: props.damping,
  stiffness: props.stiffness
}))

// Motion setup
const elementRef = ref(null)
const xPoint = useMotionValue(0)
const yPoint = useMotionValue(0)
const x = useSpring(xPoint, springConfig)
const y = useSpring(yPoint, springConfig)

// Mouse move handler with offset
const handlePointerMove = ({ clientX, clientY }) => {
  const element = elementRef.value?.$el
  if (!element) return

  frame.read(() => {
    xPoint.set(clientX - element.offsetWidth / 2 + props.offsetX)
    yPoint.set(clientY - element.offsetHeight / 2 + props.offsetY)
  })
}

// Mouse enter handler
const handleMouseEnter = (event) => {
  const target = event.target.closest('[data-pointer]')
  if (!target) return

  // If we're already on this element, don't change
  if (currentHoveredElement.value === target) return

  currentHoveredElement.value = target
  const pointerType = target.getAttribute('data-pointer')
  const pointerText = target.getAttribute('data-pointer-text')

  if (pointerType) {
    currentState.value = pointerType
    if (pointerText) {
      customText.value = pointerText
    }
  }
}

// Mouse leave handler
const handleMouseLeave = (event) => {
  const target = event.target.closest('[data-pointer]')
  if (!target) return

  // Only reset if we're leaving the currently tracked element
  if (currentHoveredElement.value === target) {
    // Check if we're moving to a descendant
    const relatedTarget = event.relatedTarget
    if (relatedTarget && target.contains(relatedTarget)) {
      return // Don't reset if moving to a child element
    }

    currentHoveredElement.value = null
    currentState.value = 'default'
  }
}

// Global mouse move to handle edge cases
const handleGlobalMouseMove = (event) => {
  const target = event.target.closest('[data-pointer]')

  // If we're not over any pointer element, reset
  if (!target && currentHoveredElement.value) {
    currentHoveredElement.value = null
    currentState.value = 'default'
  }
}

// Lifecycle
onMounted(() => {
  // Preload icons by rendering them, then hide after a frame
  nextTick(() => {
    iconsPreloaded.value = true
  })

  window.addEventListener("pointermove", handlePointerMove)
  window.addEventListener("mousemove", handleGlobalMouseMove)
  document.addEventListener("mouseenter", handleMouseEnter, true)
  document.addEventListener("mouseleave", handleMouseLeave, true)
})

onUnmounted(() => {
  window.removeEventListener("pointermove", handlePointerMove)
  window.removeEventListener("mousemove", handleGlobalMouseMove)
  document.removeEventListener("mouseenter", handleMouseEnter, true)
  document.removeEventListener("mouseleave", handleMouseLeave, true)
})
</script>

<style scoped>
.icon-preloader {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.pointer-follower {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.2s ease;
}

.pointer-hidden {
  opacity: 0;
}

/* Default pointer */
.pointer-default {
  width: v-bind('typeof size === "number" ? size + "px" : size');
  height: v-bind('typeof size === "number" ? size + "px" : size');
  background: v-bind('color');
  border-radius: v-bind('shape === "circle" ? "50%" : shape === "rounded" ? "8px" : "0"');
}

.pointer-button {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.pointer-link {
  width: 60px;
  height: 60px;
  background: rgb(244, 244, 244);
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.pointer-image {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}

.pointer-text {
  padding: 4px 8px;
  background: black;
  border-radius: 20px;
  color: #c3fcb1;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}
</style>