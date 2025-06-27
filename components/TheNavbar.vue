<template>
  <nav class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <div class="bg-black bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-6 shadow-lg">
      <!-- Sun/Moon Icon -->
      <div class="flex items-center">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
          </path>
        </svg>
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center space-x-6">
        <a href="#work" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
          Work
        </a>
        <a href="#story" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
          Story
        </a>
        <a href="#process" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
          Process
        </a>
        <a href="#chat" class="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
          Chat
        </a>
      </div>

      <!-- Start Project Button -->
      <button
        class="bg-bubbles hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200">
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