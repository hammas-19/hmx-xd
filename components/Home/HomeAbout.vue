<template>
  <div class="def-container def-padding-full def-margin-full">
    <div class=" lg:mb-20 mb-14 w-fit mx-auto flex flex-col">
      <small class="self-end font-doto text-2xl font-bold">
        <MotionAnimatedText text="Get to Know me!" animation="fadeIn" stagger />
      </small>
      <h2 class="text-boss font-sora lg:text-6xl text-3xl w-full text-center font-semibold uppercase">
        Who’s Behind the Code?
      </h2>
    </div>
    <div class="grid lg:grid-cols-5 gap-5 mb-5">
      <div class="lg:rounded-[40px] rounded-[30px] bg-[#151515] flex justify-center items-end lg:p-8 p-5 lg:col-span-2">
        <p class="text-white">
          Currently based in Karachi, Pakistan, I began my journey into coding in 2021 while pursuing a Bachelor's in
          Computer Science, graduating in 2024. I'm focused on developing with Vue/Nuxt and Tailwind, but I am also
          proficient in React, HTML, CSS, and JavaScript.
          <br> <br>
          I am passionate about creating user-friendly, responsive websites and applications. My strengths include
          effective communication, problem-solving, and working collaboratively with teams to deliver impactful
          solutions.
          <br> <br>
          As I continue to grow as a developer, my goal is to explore new technologies, enhance my skills, and
          contribute to innovative projects that make a difference.
        </p>

      </div>
      <div class="lg:col-span-3 lg:rounded-[40px] rounded-[30px] flex justify-center  w-full">
        <div class="lg:rounded-[40px] rounded-[30px] overflow-hidden">
          <img src="/home/heelo.gif" class="aspect-video lg:rounded-[40px] rounded-[30px] object-cover h-full" alt="">
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-3 gap-5">
      <div class="lg:rounded-[40px] rounded-[30px] bg-snow overflow-hidden">
        <img src="/home/portGif.gif" class=" h-full object-cover aspect-square lg:rounded-[40px] rounded-[30px]" alt="">
      </div>
      <div class="lg:col-span-2 lg:rounded-[40px] rounded-[30px] bg-[#151515] flex flex-col lg:p-8 p-5 w-full">
        <!-- Steps for Creating Frontend Projects -->
        <ul class="mt-4 space-y-4">
          <li class="flex items-center gap-3 text-white">
            <Icon name="pixelarticons:search" class="min-h-8 min-w-8 text-white" />
            <span><strong>Research & Ideation:</strong> Understand project requirements, user needs, and conduct
              competitor analysis.</span>
          </li>
          <li class="flex items-center gap-3 text-white">
            <Icon name="pixelarticons:section-copy" class="min-h-8 min-w-8 text-white" />
            <span><strong>Wireframing & Design:</strong> Create wireframes, design UI/UX with a focus on user flow and
              accessibility.</span>
          </li>
          <li class="flex items-center gap-3 text-white">
            <Icon name="pixelarticons:bullseye-arrow" class="min-h-8 min-w-8 text-white" />
            <span><strong>Technical Planning:</strong> Choose technologies, plan folder structure, components, and set
              up version control.</span>
          </li>
          <li class="flex items-center gap-2 text-white">
            <Icon name="pixelarticons:code" class="min-h-8 min-w-8 text-white" />
            <span><strong>Coding:</strong> Write clean, maintainable code, implement responsive layouts, and integrate
              APIs.</span>
          </li>
          <li class="flex items-center gap-2 text-white">
            <Icon name="pixelarticons:checklist" class="min-h-8 min-w-8 text-white" />
            <span><strong>Testing:</strong> Perform cross-browser/device testing, unit testing, and ensure
              accessibility.</span>
          </li>
          <li class="flex items-center gap-3 text-white">
            <Icon name="pixelarticons:debug-stop" class="min-h-8 min-w-8 text-white" />
            <span><strong>Optimization:</strong> Optimize for performance (minify assets, lazy loading, image
              optimization).</span>
          </li>
          <li class="flex items-center gap-3 text-white">
            <Icon name="pixelarticons:cloud-done" class="min-h-8 min-w-8 text-white" />
            <span><strong>Deployment:</strong> Bundle assets, deploy to platforms (Netlify), and set up
              CI/CD.</span>
          </li>
          <li class="flex items-center gap-3 text-white">
            <Icon name="pixelarticons:frame-check" class="min-h-8 min-w-8 text-white" />
            <span><strong>Pre-Launch:</strong> Monitor performance, collect user feedback, and implement updates or
              fixes.</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>