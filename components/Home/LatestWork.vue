<template>
  <div class="bottom-conic def-padding-full h-screen">
    <div class="mt-40 md:mb-20 mb-14 w-fit mx-auto flex flex-col">
      <small class="self-end font-doto text-2xl font-bold">till today</small>
      <h2 class="text-boss font-sora lg:text-6xl text-3xl w-full text-center font-semibold uppercase">
        Recent Performance
      </h2>
    </div>
    <div class="  def-container space-y-40">
      <div class="  w-full  p-7 rounded-[20px] bg-[#ffffff50] backdrop-blur-sm">
        <div class="  flex justify-between">
          <div class="  flex flex-col gap-10">
            <div class="  flex items-center gap-5">
              <img src="/home/Rechik_Mascot_lite.webp" class="h-12 w-fit object-cover rounded-xl bg-black p-2"
                alt="Rechik.pk">
              <span class="text-boss font-sora md:text-4xl text-xl font-black uppercase">Rechik</span>
            </div>
            <p class="text-darkLiver text-xl font-medium">
              An E-commerce Wardrobe Store that specializes in providing a wide range of clothing and accessories.
              Developed using <strong>Nuxt 3</strong>, <strong>Tailwind CSS</strong> and <Strong>Django</Strong>
            </p>
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
    </div>
  </div>
</template>