<template>
  <motion.div ref="elementRef" class="pointer-follower"
    :class="[`pointer-${currentState}`, { 'pointer-hidden': !isVisible }]" :style="{ x, y }">
    <!-- Default pointer -->
    <div v-if="currentState === 'default'" class="pointer-default backdrop-blur-[1.5px] border border-bubbles text-[#5757573b]"></div>

    <!-- Button pointer -->
    <div v-else-if="currentState === 'button'" class="pointer-button">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>

    <!-- Link pointer -->
    <div v-else-if="currentState === 'link'" class="pointer-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
      </svg>
    </div>

    <!-- Image pointer -->
    <div v-else-if="currentState === 'image'" class="pointer-image">
      VIEW
    </div>

    <!-- Text pointer -->
    <div v-else-if="currentState === 'text'" class="pointer-text">
      {{ customText }}
    </div>
  </motion.div>
</template>

<script setup>
import { frame, motion, useMotionValue, useSpring } from "motion-v"
import { ref, onMounted, onUnmounted, computed } from "vue"

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
  }
})

// State
const currentState = ref('default')
const customText = ref('Click me!')
const isVisible = ref(true)

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

// Mouse move handler
const handlePointerMove = ({ clientX, clientY }) => {
  const element = elementRef.value?.$el
  if (!element) return

  frame.read(() => {
    xPoint.set(clientX - element.offsetWidth / 2)
    yPoint.set(clientY - element.offsetHeight / 2)
  })
}

// Mouse enter handler
const handleMouseEnter = (event) => {
  const target = event.target.closest('[data-pointer]')
  if (!target) return

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
  if (target) {
    currentState.value = 'default'
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener("pointermove", handlePointerMove)
  document.addEventListener("mouseenter", handleMouseEnter, true)
  document.addEventListener("mouseleave", handleMouseLeave, true)
})

onUnmounted(() => {
  window.removeEventListener("pointermove", handlePointerMove)
  document.removeEventListener("mouseenter", handleMouseEnter, true)
  document.removeEventListener("mouseleave", handleMouseLeave, true)
})
</script>

<style scoped>
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
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.9);
  border-radius: 50%;
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
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
</style>