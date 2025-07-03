<template>
  <nav class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <div class="bg-black bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-6 shadow-lg">
      <!-- Sun/Moon Icon -->
      <div class="flex items-center">
        <NuxtLink to="/">  
          <img src="/home/signLogo.png" class="w-7 h-fit" alt="Hammas Masood">
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center space-x-6 font-doto font-semibold ">
        <a href="#work" class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
          Work
        </a>
        <a href="#story" class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
          Story
        </a>
        <a href="#process" class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
          Process
        </a>
        <a href="#chat" class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
          Chat
        </a>
      </div>

      <!-- Start Project Button -->
      <button
        class="bg-bubbles font-doto font-black hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm transition-colors duration-200">
        Start project
      </button>
    </div>
  </nav>
</template>

<script setup>
// You can add any navigation logic here if needed
</script>

<style scoped>
/* Additional custom styles if needed */
</style>