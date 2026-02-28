<template>
  <div class="h-screen top-conic overflow-hidden">
   <div class="absolute w-full h-full def-container inset-0 flex flex-col pt-20 md:text-[140px] sm:text-[110px] text-7xl leading-none text-center justify-center text-boss">
    <span class="bg-amber w-full">
      <Motion
        v-for="(word, index) in ['Bridging']" :key="`title-bridging-${index}`" class="inline-block mr-3"
        :initial="{ opacity: 0, y: 15, rotateX: -60 }" :animate="{ opacity: 1, y: 0, rotateX: 0 }" :transition="{
          duration: 0.3,
          delay: 0.01 + (index * 0.02),
          ease: 'linear'
        }" :while-hover="{
          y: -3,
          scale: 1.05,
          color: '#2b5bec',
          transition: { duration: 0.1 }
        }">
        {{ word }}
      </Motion>
    </span>
    <span class="bg-red w-full font-doto font-black">
      <Motion
        v-for="(word, index) in ['Logic']" :key="`title-logic-${index}`" class="inline-block mr-3"
        :initial="{ opacity: 0, y: 15, rotateX: -60 }" :animate="{ opacity: 1, y: 0, rotateX: 0 }" :transition="{
          duration: 0.3,
          delay: 0.01 + (index * 0.02),
          ease: 'linear'
        }" :while-hover="{
          y: -3,
          scale: 1.05,
          color: '#2b5bec',
          transition: { duration: 0.1 }
        }">
        {{ word }}
      </Motion>
    </span>
    <span class="bg-orange w-full font-bodoni italic">
      <Motion
        v-for="(word, index) in ['Design,']" :key="`title-design-${index}`" class="inline-block mr-3"
        :initial="{ opacity: 0, y: 15, rotateX: -60 }" :animate="{ opacity: 1, y: 0, rotateX: 0 }" :transition="{
          duration: 0.3,
          delay: 0.01 + (index * 0.02),
          ease: 'linear'
        }" :while-hover="{
          y: -3,
          scale: 1.05,
          color: '#2b5bec',
          transition: { duration: 0.1 }
        }">
        {{ word }}
      </Motion>
    </span>
    <span class=" w-full font-sans">
      <Motion
        v-for="(word, index) in ['Humans...']" :key="`title-human-${index}`" class="inline-block mr-3"
        :initial="{ opacity: 0, y: 15, rotateX: -60 }" :animate="{ opacity: 1, y: 0, rotateX: 0 }" :transition="{
          duration: 0.3,
          delay: 0.01 + (index * 0.02),
          ease: 'linear'
        }" :while-hover="{
          y: -3,
          scale: 1.05,
          color: '#2b5bec',
          transition: { duration: 0.1 }
        }">
        {{ word }}
      </Motion>
    </span>
    <span class="bg-purple w-full font-sans">
      <p class=" md:text-xl text-sm text-boss  font-medium leading-normal pt-5">
        <Motion
          v-for="(word, index) in subtitleWords" :key="`subtitle-${index}`" class="inline-block mr-3"
          :initial="{ opacity: 0, y: 15, rotateX: -60 }" :animate="{ opacity: 1, y: 0, rotateX: 0 }" :transition="{
            duration: 0.3,
            delay: 0.01 + (index * 0.02),
            ease: 'linear'
          }" :while-hover="{
            y: -3,
            scale: 1.05,
            color: '#2b5bec',
            transition: { duration: 0.1 }
          }">
          {{ word }}
        </Motion>
      </p>
    </span>
   

   </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Bold title
const titleText = "Bridging  logic,  design  &  humans"
const titleWords = computed(() => titleText.split(' '))

// Lighter subtitle (2 lines)
const subtitleText = "Developing interfaces that fade into experience, through thoughtful interaction and clean engineering."
const subtitleWords = computed(() => subtitleText.split(' '))
</script>