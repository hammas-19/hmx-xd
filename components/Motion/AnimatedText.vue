<template>
  <div>
    <Motion :initial="fadeIn.initial" :animate="fadeIn.animate" :whileHover="fadeIn.hover"
    :transition="{ duration: 0.8, delay: 0.2 }">
    <component :is="tag" :class="$attrs.class">
      <template v-if="stagger">
        <Motion v-for="(letter, index) in letters" :key="index" class="inline-block" :initial="staggerIn.initial"
        :animate="staggerIn.animate" :whileHover="staggerIn.hover"
          :transition="{ duration: 0.5, delay: index * 0.1, ease: 'backOut' }">
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
    validator: (value) => ['fadeIn', 'slideUp', 'slideDown', 'scale'].includes(value)
  }
})

// Split text into letters
const letters = computed(() => props.text.split(''))

// Animation presets
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { scale: 1.02 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5 }
  },
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    hover: { y: 5 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 }
  }
}

const staggerAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { y: -5, scale: 1.1, transition: { duration: 0.2 } }
  },
  slideUp: {
    initial: { opacity: 0, y: 20, rotateX: -45 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    hover: { y: -8, rotateY: 10, scale: 1.1, transition: { duration: 0.2 } }
  }
}

// Get current animation
const fadeIn = computed(() => animations[props.animation] || animations.fadeIn)
const staggerIn = computed(() => staggerAnimations[props.animation] || staggerAnimations.slideUp)
</script>