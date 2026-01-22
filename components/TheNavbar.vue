<template>
  <div
    class="w-full fixed gap-2 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between bg-gradient-to-t from-[#ffffff22] to-[#ffffffeb] backdrop-blur-md">
    <!-- Logo -->
    
     <NuxtLink to="/" data-pointer="text" data-pointer-text="Hammas Masood" class="m-2 rounded-full bg-black">
        <img src="/home/signLogo.png" class="w-[43px] h-fit px-2 py-[3px]" alt="Hammas Masood">
      </NuxtLink>
    
    <nav class="w-fit my-3">
      <div
        class="bg-black bg-opacity-80 backdrop-blur-sm rounded-full md:px-6 px-2 md:py-3 py-1.5 flex items-center md:space-x-6 space-x-2">
        <!-- Navigation Links -->
        <div class="flex items-center md:space-x-6 space-x-2 font-doto font-semibold pl-2">
          <div class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
            <slot name="work" />
          </div>
          <div class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
            <slot name="about" />
          </div>
          <div class="text-bubbles hover:text-white transition-colors duration-200 text-sm">
            <slot name="flow" />
          </div>
        </div>
        <!-- Start Project Button -->
        <div
          data-pointer="contact"
          class="bg-bubbles font-doto font-black hover:bg-snow text-black px-4 py-2 rounded-full text-sm transition-colors duration-200">
          <slot name="connect" />
        </div>
      </div>
    </nav>
    <div class="" />
  </div>
</template>