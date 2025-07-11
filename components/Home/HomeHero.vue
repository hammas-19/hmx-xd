<template>
  <div class="h-screen top-conic pb-16 overflow-hidden">
    <div
      class="h-full flex flex-col md:flex-row md:justify-center justify-end  sm:items-end def-container relative">
      <div class="absolute inset-y-0 top-1/12 w-full h-full  flex  items-center max-w-[820px]">
        <Motion :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }">
          <p class="md:text-2xl text-base  text-boss !text-left font-black font-doto sm:px-10 px-5 -mb-40 sm:mb-0">
            <Motion v-for="(word, index) in words" :key="index" class="inline-block mr-2"
              :initial="{ opacity: 0, y: 20, rotateX: -90 }" :animate="{ opacity: 1, y: 0, rotateX: 0 }" :transition="{
              duration: 0.6,
              delay: 0.4 + (index * 0.08),
              ease: 'backOut'
            }" :whileHover="{
                y: -5,
                scale: 1.05,
                color: '#95afb8',
                transition: { duration: 0.2 }
              }">
              {{ word }}
            </Motion>
          </p>
        </Motion>
      </div>

      <!-- Regular Hammas text (no animation) -->
      <h1
        class="lg:leading-35 xl:text-[200px] lg:text-[140px] md:text-[100px] text-[70px] text-boss font-sans font-bold md:font-medium self-end">
        Hammas
      </h1>

      <!-- SVG animating from RIGHT to LEFT (D O S A M) -->
      <Motion :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, delay: 1.5, ease: 'backOut' }" :whileHover="{ scale: 1.1, y: -5 }">
        <svg class="xl:h-24 sm:h-12 xl:-mb-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.18 54.75">
          <!-- FIFTH letter 'D' - starts FIRST (2.0s) -->
          <Motion as="path"
            d="M227.76,14.25q0-7.32,5.09-11.09,4-3.09,10.93-3.08a17.06,17.06,0,0,1,11.47,4q5.94,5.08,5.93,14.4q0,8.77-4.69,14.55a14.44,14.44,0,0,1-11.78,5.62a12.06,12.06,0,0,1-10.09-4.77,8.2,8.2,0,0,1-6,2.46h-14.7V28.49h11.85a2,2,0,0,0,1.47-.62,1.79,1.79,0,0,0,.53-1.31Zm9.32,13.39a8.67,8.67,0,0,0,6.55,3.08a7,7,0,0,0,5.93-3.19,13.8,13.8,0,0,0,2.31-8.28q0-5.55-2.54-8.7a7.54,7.54,0,0,0-6-2.7a5.65,5.65,0,0,0-4.39,1.77a6,6,0,0,0-1.85,4.63Z"
            stroke="currentColor" stroke-width="2" fill="none" class="text-boss"
            :initial="{ pathLength: 0, opacity: 0 }" :animate="{ pathLength: 1, opacity: 1 }"
            :transition="{ duration: 1.5, delay: 2.0, ease: 'easeInOut' }" />

          <!-- FOURTH letter 'O' - starts SECOND (2.5s) -->
          <Motion as="path"
            d="M210.59.92V28.49h3.93v7.85h-3L209,33.19h-.16a8.15,8.15,0,0,1-6.54,3.15H185.8l-2.54-3.15H183a8,8,0,0,1-6.47,3.15H160l-2.54-3.15h-.23a8,8,0,0,1-6.47,3.15H128.9V28.49h18.86a1.71,1.71,0,0,0,1.93-1.93V9.78h9.39V26.1c0,1.08,0,1.88-.08,2.39h14.56a1.7,1.7,0,0,0,1.92-1.93V5.31h9.4V25.87c0,.31,0,.77-.08,1.39v1.23h14.48a1.7,1.7,0,0,0,1.92-1.93V.92Z"
            stroke="currentColor" stroke-width="2" fill="none" class="text-boss"
            :initial="{ pathLength: 0, opacity: 0 }" :animate="{ pathLength: 1, opacity: 1 }"
            :transition="{ duration: 1.5, delay: 2.5, ease: 'easeInOut' }" />

          <!-- THIRD letter 'S' - starts THIRD (3.0s) -->
          <Motion as="path"
            d="M88,14.48A20.5,20.5,0,0,1,97.56,3,22.25,22.25,0,0,1,108.72.08a19.81,19.81,0,0,1,11,3.23,21,21,0,0,1,8.94,11.17l-.93,2.15a22.82,22.82,0,0,0-6.47,4.78A18,18,0,0,0,117,28.49h12.4v7.85H112.5a5.17,5.17,0,0,1-3.93-2h-.39a5.3,5.3,0,0,1-4.08,2H77.31V28.49H99.64a19,19,0,0,0-3.93-6.7,19.42,19.42,0,0,0-6.85-5.16Zm30.8-.62a11.43,11.43,0,0,0-5-4.77a12.1,12.1,0,0,0-5.32-1.16a13.59,13.59,0,0,0-5.85,1.31a11,11,0,0,0-4.77,4.62a16.51,16.51,0,0,1,5.54,4.62a23.9,23.9,0,0,1,4.77,7.85h.31a23.89,23.89,0,0,1,5-8.24A16.69,16.69,0,0,1,118.81,13.86Z"
            stroke="currentColor" stroke-width="2" fill="none" class="text-boss"
            :initial="{ pathLength: 0, opacity: 0 }" :animate="{ pathLength: 1, opacity: 1 }"
            :transition="{ duration: 1.5, delay: 3.0, ease: 'easeInOut' }" />

          <!-- SECOND letter 'A' - starts FOURTH (3.5s) -->
          <Motion as="path"
            d="M59.37,36.34q-8.48,0-13.32-5.77A18.4,18.4,0,0,1,42,18.4q0-8.62,4.85-13.47A17.88,17.88,0,0,1,59.83,0a17.49,17.49,0,0,1,10,2.85q5.55,4,5.54,11.4V28.49h2.47v7.85H75.31q-.54,8.32-5.86,13A20,20,0,0,1,60.6,53.9a31.24,31.24,0,0,1-7.08.85c-.77,0-1.88,0-3.32-.16H50l-3.92-4.85V46.35a35.21,35.21,0,0,0,5.93.54q12.62,0,13.78-10.55ZM66,14.25a6,6,0,0,0-6.16-6.4,7.7,7.7,0,0,0-6.24,2.78q-2.31,2.76-2.31,7.62a10.65,10.65,0,0,0,2.54,7.47,8.94,8.94,0,0,0,6.93,2.77H66Z"
            stroke="currentColor" stroke-width="2" fill="none" class="text-boss"
            :initial="{ pathLength: 0, opacity: 0 }" :animate="{ pathLength: 1, opacity: 1 }"
            :transition="{ duration: 1.5, delay: 3.5, ease: 'easeInOut' }" />

          <!-- FIRST letter 'M' - starts LAST (4.0s) -->
          <Motion as="path"
            d="M7.78.46A35.1,35.1,0,0,1,13.86,0q8.85,0,14.32,5.7A17.92,17.92,0,0,1,33,18.48v9.39A8,8,0,0,1,30.42,34a7.81,7.81,0,0,1-5.7,2.38H0V28.49H21.71a1.7,1.7,0,0,0,1.93-1.93V19.4a11.55,11.55,0,0,0-3.23-8.54c-2-2-4.91-3.08-8.71-3.24a18.78,18.78,0,0,0-3.92.31Z"
            stroke="currentColor" stroke-width="2" fill="none" class="text-boss"
            :initial="{ pathLength: 0, opacity: 0 }" :animate="{ pathLength: 1, opacity: 1 }"
            :transition="{ duration: 1.5, delay: 4.0, ease: 'easeInOut' }" />

          <!-- Fill all letters after drawing is complete -->
          <Motion as="g" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
            :transition="{ duration: 0.8, delay: 6.0 }">
            <!-- Fill D -->
            <path class="text-boss"
              d="M227.76,14.25q0-7.32,5.09-11.09,4-3.09,10.93-3.08a17.06,17.06,0,0,1,11.47,4q5.94,5.08,5.93,14.4q0,8.77-4.69,14.55a14.44,14.44,0,0,1-11.78,5.62a12.06,12.06,0,0,1-10.09-4.77,8.2,8.2,0,0,1-6,2.46h-14.7V28.49h11.85a2,2,0,0,0,1.47-.62,1.79,1.79,0,0,0,.53-1.31Zm9.32,13.39a8.67,8.67,0,0,0,6.55,3.08a7,7,0,0,0,5.93-3.19,13.8,13.8,0,0,0,2.31-8.28q0-5.55-2.54-8.7a7.54,7.54,0,0,0-6-2.7a5.65,5.65,0,0,0-4.39,1.77a6,6,0,0,0-1.85,4.63Z"
              fill="currentColor" />

            <!-- Fill O -->
            <path class="text-boss"
              d="M210.59.92V28.49h3.93v7.85h-3L209,33.19h-.16a8.15,8.15,0,0,1-6.54,3.15H185.8l-2.54-3.15H183a8,8,0,0,1-6.47,3.15H160l-2.54-3.15h-.23a8,8,0,0,1-6.47,3.15H128.9V28.49h18.86a1.71,1.71,0,0,0,1.93-1.93V9.78h9.39V26.1c0,1.08,0,1.88-.08,2.39h14.56a1.7,1.7,0,0,0,1.92-1.93V5.31h9.4V25.87c0,.31,0,.77-.08,1.39v1.23h14.48a1.7,1.7,0,0,0,1.92-1.93V.92Z"
              fill="currentColor" />

            <!-- Fill S -->
            <path class="text-boss"
              d="M88,14.48A20.5,20.5,0,0,1,97.56,3,22.25,22.25,0,0,1,108.72.08a19.81,19.81,0,0,1,11,3.23,21,21,0,0,1,8.94,11.17l-.93,2.15a22.82,22.82,0,0,0-6.47,4.78A18,18,0,0,0,117,28.49h12.4v7.85H112.5a5.17,5.17,0,0,1-3.93-2h-.39a5.3,5.3,0,0,1-4.08,2H77.31V28.49H99.64a19,19,0,0,0-3.93-6.7,19.42,19.42,0,0,0-6.85-5.16Zm30.8-.62a11.43,11.43,0,0,0-5-4.77a12.1,12.1,0,0,0-5.32-1.16a13.59,13.59,0,0,0-5.85,1.31a11,11,0,0,0-4.77,4.62a16.51,16.51,0,0,1,5.54,4.62a23.9,23.9,0,0,1,4.77,7.85h.31a23.89,23.89,0,0,1,5-8.24A16.69,16.69,0,0,1,118.81,13.86Z"
              fill="currentColor" />

            <!-- Fill A -->
            <path class="text-boss"
              d="M59.37,36.34q-8.48,0-13.32-5.77A18.4,18.4,0,0,1,42,18.4q0-8.62,4.85-13.47A17.88,17.88,0,0,1,59.83,0a17.49,17.49,0,0,1,10,2.85q5.55,4,5.54,11.4V28.49h2.47v7.85H75.31q-.54,8.32-5.86,13A20,20,0,0,1,60.6,53.9a31.24,31.24,0,0,1-7.08.85c-.77,0-1.88,0-3.32-.16H50l-3.92-4.85V46.35a35.21,35.21,0,0,0,5.93.54q12.62,0,13.78-10.55ZM66,14.25a6,6,0,0,0-6.16-6.4,7.7,7.7,0,0,0-6.24,2.78q-2.31,2.76-2.31,7.62a10.65,10.65,0,0,0,2.54,7.47,8.94,8.94,0,0,0,6.93,2.77H66Z"
              fill="currentColor" />

            <!-- Fill M -->
            <path class="text-boss"
              d="M7.78.46A35.1,35.1,0,0,1,13.86,0q8.85,0,14.32,5.7A17.92,17.92,0,0,1,33,18.48v9.39A8,8,0,0,1,30.42,34a7.81,7.81,0,0,1-5.7,2.38H0V28.49H21.71a1.7,1.7,0,0,0,1.93-1.93V19.4a11.55,11.55,0,0,0-3.23-8.54c-2-2-4.91-3.08-8.71-3.24a18.78,18.78,0,0,0-3.92.31Z"
              fill="currentColor" />
          </Motion>
        </svg>
      </Motion>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Split paragraph into words for animation
const text = "Hey there! here's your trusted frontend partner, creating intuitive, user-focused web experiences that drive results."
const words = computed(() => text.split(' '))
</script>