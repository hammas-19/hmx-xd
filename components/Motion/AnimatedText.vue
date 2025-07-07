<template>
  <div>
    <Motion :initial="fadeIn.initial" :whileInView="fadeIn.whileInView" :whileHover="fadeIn.hover"
      :transition="{ duration: 0.5, delay: 0.7 }" :whileTap="fadeIn.whileTap" :viewport="fadeIn.viewport">
      <component :is="tag" :class="$attrs.class">
        <template v-if="stagger">
          <Motion v-for="(letter, index) in letters" :key="index" class="inline-block" :initial="staggerIn.initial"
            :whileInView="staggerIn.whileInView" :whileHover="staggerIn.hover" :whileTap="staggerIn.whileTap"
            :viewport="staggerIn.viewport"
            :transition="{ duration: staggerIn.transition?.duration || 0.5, delay: index * (staggerIn.transition?.delayMultiplier || 0.1), ease: staggerIn.transition?.ease || 'backOut' }">
            {{ letter === ' ' ? '\u00A0' : letter }}
          </Motion>
        </template>
        <template v-else>
          {{ text }}
        </template>
      </component>
    </Motion>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'h1'
  },
  stagger: {
    type: Boolean,
    default: false
  },
  animation: {
    type: String,
    default: 'fadeIn',
    validator: (value) => ['fadeIn', 'slideUp', 'slideDown', 'scale', 'inViewRotate'].includes(value)
  }
})

// Split text into letters
const letters = computed(() => props.text.split(''))

// Animation presets
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    hover: { scale: 1.02 },
    viewport: { amount: 0.3 } // Triggers when 30% is in view
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    hover: { y: -5 },
    viewport: { amount: 0.3 }
  },
  slideDown: {
    initial: { opacity: 0, y: -50 },
    whileInView: { opacity: 1, y: 0 },
    hover: { y: 5 },
    viewport: { amount: 0.3 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 },
    viewport: { amount: 0.3 }
  },
  inViewRotate: {
    initial: { opacity: 0, y: 100, rotate: -5 },
    whileInView: { opacity: 1, y: 0, rotate: 0 },
    hover: {
      y: -10,
      scale: 1.02,
      rotate: 1,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    whileTap: { scale: 0.98 },
    viewport: { amount: 0.3 }
  }
}

const staggerAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    hover: { y: -5, scale: 1.1, transition: { duration: 0.2 } },
    viewport: { amount: 0.3 },
    transition: {
      duration: 0.5,
      delayMultiplier: 0.1,
      ease: 'backOut'
    }
  },
  slideUp: {
    initial: { opacity: 0, y: 20, rotateX: -45 },
    whileInView: { opacity: 1, y: 0, rotateX: 0 },
    hover: { y: -8, rotateY: 10, scale: 1.1, transition: { duration: 0.2 } },
    viewport: { amount: 0.3 },
    transition: {
      duration: 0.5,
      delayMultiplier: 0.1,
      ease: 'backOut'
    }
  },
  inViewRotate: {
    initial: { opacity: 0, y: 100, rotate: -5 },
    whileInView: { opacity: 1, y: 0, rotate: 0 },
    hover: {
      y: -10,
      scale: 1.02,
      rotate: 1,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    whileTap: { scale: 0.98 },
    viewport: { amount: 0.3 },
    transition: {
      duration: 1,
      delayMultiplier: 0.1,
      ease: 'backOut'
    }
  }
}

// Get current animation
const fadeIn = computed(() => animations[props.animation] || animations.fadeIn)
const staggerIn = computed(() => staggerAnimations[props.animation] || staggerAnimations.slideUp)
</script>