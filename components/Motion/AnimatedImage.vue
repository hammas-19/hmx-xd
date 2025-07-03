<template>
  <div>
    <Motion :initial="currentAnimation.initial" :animate="currentAnimation.animate" :whileHover="currentAnimation.hover"
    :whileTap="currentAnimation.tap" :transition="{ duration: 0.6, delay: 0.8, ease: 'backOut' }">
    <img :src="src" :alt="alt" :class="[$attrs.class, 'cursor-pointer']" />
  </Motion>
</div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  animation: {
    type: String,
    default: 'slideUp',
    validator: (value) => ['fadeIn', 'slideUp', 'slideLeft', 'slideRight', 'scale', 'rotate'].includes(value)
  }
})

// Animation presets
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.1, y: -10, rotate: 2 },
    tap: { scale: 0.95 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 100, rotate: 15 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    hover: { scale: 1.05, rotate: -5 },
    tap: { scale: 0.95 }
  },
  slideRight: {
    initial: { opacity: 0, x: -100, rotate: -15 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    hover: { scale: 1.05, rotate: 5 },
    tap: { scale: 0.95 }
  },
  scale: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -180, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    hover: { rotate: 5, scale: 1.05 },
    tap: { rotate: -5, scale: 0.95 }
  }
}

// Get current animation
const currentAnimation = computed(() => animations[props.animation] || animations.slideUp)
</script>