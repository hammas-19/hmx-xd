<template>
  <motion.div ref="elementRef" :class="elementClass" :style="{ x, y, ...customStyle }">
    <slot>
      <!-- Default content if no slot provided -->
      <div class="default-follower"></div>
    </slot>
  </motion.div>
</template>

<script setup>
import { frame, motion, useMotionValue, useSpring } from "motion-v"
import { ref, onMounted, onUnmounted, computed } from "vue"

// Props
const props = defineProps({
  // Spring configuration
  damping: {
    type: Number,
    default: 3
  },
  stiffness: {
    type: Number,
    default: 50
  },
  restDelta: {
    type: Number,
    default: 0.001
  },
  // Visual properties
  size: {
    type: [Number, String],
    default: 100
  },
  color: {
    type: String,
    default: '#ff0088'
  },
  shape: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'square', 'rounded'].includes(value)
  },
  // Behavior
  followMouse: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  },
  // Custom classes
  class: {
    type: String,
    default: ''
  }
})

// Spring configuration
const spring = computed(() => ({
  damping: props.damping,
  stiffness: props.stiffness,
  restDelta: props.restDelta
}))

// Motion values and springs
const elementRef = ref(null)
const xPoint = useMotionValue(0)
const yPoint = useMotionValue(0)
const x = useSpring(xPoint, spring)
const y = useSpring(yPoint, spring)

// Computed styles
const elementClass = computed(() => {
  const baseClass = 'pointer-follower'
  const shapeClass = `shape-${props.shape}`
  return `${baseClass} ${shapeClass} ${props.class}`.trim()
})

const customStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  backgroundColor: props.color
}))

// Pointer move handler
const handlePointerMove = ({ clientX, clientY }) => {
  if (!props.followMouse) return

  const element = elementRef.value?.$el
  if (!element) return

  frame.read(() => {
    // Use viewport coordinates instead of element offset
    xPoint.set(clientX - element.offsetWidth / 2 + props.offset.x)
    yPoint.set(clientY - element.offsetHeight / 2 + props.offset.y)
  })
}

// Lifecycle
onMounted(() => {
  if (props.followMouse) {
    window.addEventListener("pointermove", handlePointerMove)
  }
})

onUnmounted(() => {
  if (props.followMouse) {
    window.removeEventListener("pointermove", handlePointerMove)
  }
})

// Expose methods for manual control
defineExpose({
  moveTo: (newX, newY) => {
    xPoint.set(newX)
    yPoint.set(newY)
  },
  setPosition: (newX, newY) => {
    xPoint.set(newX)
    yPoint.set(newY)
  }
})
</script>

<style scoped>
.pointer-follower {
  position: fixed;
  /* Changed from absolute to fixed */
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}

.shape-circle {
  border-radius: 50%;
}

.shape-square {
  border-radius: 0;
}

.shape-rounded {
  border-radius: 12px;
}

.default-follower {
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-radius: inherit;
}
</style>