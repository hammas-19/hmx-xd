<template>
  <div class="h-screen border flex justify-center items-center def-container">
    <div class="border-4 md:rounded-[50px] rounded-[35px] border-black w-full top-conic overflow-hidden">
      <div class=" py-10 px-5">
        <div class="flex justify-between ">
          <div class="  flex flex-col gap-10">
            <div class="  flex items-center gap-5">
              <img src="/home/Rechik_Mascot_lite.webp" class="h-12 w-fit object-cover rounded-xl bg-black p-2"
                alt="Rechik.pk">
              <span class="text-boss font-sora md:text-4xl text-xl font-black uppercase">Rechik</span>
            </div>

          </div>
          <!-- From Uiverse.io by Shubh0408 -->
          <div class="group relative flex size-10 items-center justify-center gap-1 rounded-lg  w-full max-w-[40px]">
            <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
            <div
              class="relative size-1 origin-center rounded-full bg-black duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-black before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-black after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45" />
            <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
          </div>
        </div>
      </div>
      <!-- Folder -->
      <div class="flex flex-col md:rounded-[40px] rounded-[20px] overflow-hidden w-full ">
        <div class="flex w-[45%] md:w-[30%]  min-h-[40px] ">
          <div class="w-3/2 min-h-full bg-boss mb-[-1px] rounded-tr-sm" />
          <div class="1/3 theCurve w-[70px] bg-boss min-h-full md:ml-[1-px] ml-[-2px] mb-[-1px]" />
        </div>
        <!-- Dynamic Data -->
        <div
          class="md:min-h-[300px] bg-boss md:rounded-tr-[40px] rounded-tr-[20px] flex flex-col justify-end p-5 md:gap-10 gap-5">
          <p class="text-white md:text-xl font-medium">
            An E-commerce Wardrobe Store that specializes in providing a wide range of clothing and accessories.
            Developed using <strong>Nuxt 3</strong>, <strong>Tailwind CSS</strong> and <Strong>Django</Strong>
          </p>
          <div class="flex flex-wrap gap-3">
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="uil:illustration"
                class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="lucide:github"
                class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="lineicons:nuxt"
                class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="flowbite:tailwind-solid"
                class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="ri:javascript-fill"
                class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="mdi:vuejs" class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
            <div class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
              <Icon name="teenyicons:netlify-solid"
                class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px]  text-bubbles" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.theCurve{
  clip-path: polygon(0 0, 0 0, 100% 100%, 0% 100%);
}
</style>