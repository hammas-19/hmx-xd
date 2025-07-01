<template>
  <section
    class="min-h-screen flex items-center justify-between p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white gap-16">
    <Motion class="flex-1 max-w-2xl" :initial="{ opacity: 0, y: 100 }" :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }">
      <Motion :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, delay: 0.2, ease: 'backOut' }">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 leading-tight font-outfit">
          Welcome to Motion
        </h1>
      </Motion>

      <Motion :initial="{ opacity: 0, x: -50 }" :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: 0.4 }">
        <p class="text-xl mb-8 opacity-90 font-inter">
          Beautiful animations made simple with motion-v
        </p>
      </Motion>

      <Motion class="flex gap-4 flex-wrap" :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.6 }">
        <Motion :whileHover="{ scale: 1.05 }" :whileTap="{ scale: 0.95 }" :transition="{ duration: 0.2 }">
          <button
            class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow font-dm-sans">
            Get Started
          </button>
        </Motion>

        <Motion :whileHover="{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }" :whileTap="{ scale: 0.95 }"
          :transition="{ duration: 0.2 }">
          <button
            class="bg-transparent text-white px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors font-dm-sans">
            Learn More
          </button>
        </Motion>
      </Motion>
    </Motion>

    <Motion class="flex-1 max-w-md cursor-pointer" :initial="{ opacity: 0, x: 100, rotate: 10 }"
      :animate="{ opacity: 1, x: 0, rotate: 0 }" :transition="{ duration: 0.8, delay: 0.3, ease: 'easeOut' }"
      :whileHover="{ rotate: 5, scale: 1.02 }">
      <div
        class="w-full h-80 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-2xl">
        <div class="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
          <div class="w-10 h-10 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </Motion>
  </section>
</template>

<script setup>
// Motion component is auto-imported by the motion-v/nuxt module
</script>