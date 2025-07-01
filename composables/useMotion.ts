// composables/useMotion.ts

// Define types for motion properties
interface MotionTransition {
  duration?: number
  delay?: number
  ease?: string
  [key: string]: unknown
}

interface MotionState {
  opacity?: number
  x?: number
  y?: number
  scale?: number
  rotate?: number
  rotateX?: number
  rotateY?: number
  [key: string]: unknown
}

interface MotionAnimation {
  initial?: MotionState
  animate?: MotionState
  whileHover?: MotionState
  whileTap?: MotionState
  transition?: MotionTransition
  [key: string]: unknown
}

export const useMotion = () => {
  // Common animation presets
  const presets = {
    // Entrance animations
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 }
    },

    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },

    slideDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },

    slideLeft: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },

    slideRight: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    },

    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: 'backOut' }
    },

    // Hover animations
    lift: {
      whileHover: { y: -5, scale: 1.02 },
      transition: { duration: 0.2 }
    },

    grow: {
      whileHover: { scale: 1.05 },
      transition: { duration: 0.2 }
    },

    rotate: {
      whileHover: { rotate: 5, scale: 1.02 },
      transition: { duration: 0.2 }
    },

    // Stagger animations
    stagger: (index: number, delay = 0.1): MotionAnimation => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * delay, ease: 'backOut' }
    }),

    // Letter animations
    letterDrop: (index: number): MotionAnimation => ({
      initial: { opacity: 0, y: -20, rotateX: -90 },
      animate: { opacity: 1, y: 0, rotateX: 0 },
      transition: { duration: 0.5, delay: index * 0.1, ease: 'backOut' },
      whileHover: { y: -8, scale: 1.1, transition: { duration: 0.2 } }
    })
  } as const

  // Helper to combine animations
  const combine = (...animations: MotionAnimation[]): MotionAnimation => {
    return animations.reduce((acc, anim) => ({ ...acc, ...anim }), {})
  }

  // Helper to add delay
  const withDelay = (animation: MotionAnimation, delay: number): MotionAnimation => ({
    ...animation,
    transition: { ...animation.transition, delay }
  })

  return {
    presets,
    combine,
    withDelay
  }
}