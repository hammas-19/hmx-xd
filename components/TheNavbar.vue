<template>
  <div class="w-full fixed  left-1/2 transform -translate-x-1/2 z-50 flex justify-center bg-gradient-to-t from-[#ffffff22] to-[#ffffffeb] backdrop-blur-md">
    <nav class="w-fit my-3">
      <div
        class="bg-black bg-opacity-80 backdrop-blur-sm rounded-full md:px-6 px-2 md:py-3 py-1.5 flex items-center space-x-6 shadow-lg">
        <!-- Sun/Moon Icon -->
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="/home/signLogo.png" class="w-7 h-fit" alt="Hammas Masood">
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center space-x-6 font-doto font-semibold ">
          <a data-pointer="link" href="#work"
            class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
            Work
          </a>
          <a data-pointer="link" href="#story"
            class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
            Story
          </a>
          <a data-pointer="link" href="#process"
            class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
            Process
          </a>
          <a data-pointer="link" href="#chat"
            class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
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
  </div>

</template>

<script setup>
// You can add any navigation logic here if needed
</script>

<style scoped>
/* Additional custom styles if needed */
</style>