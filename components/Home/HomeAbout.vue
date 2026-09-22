<template>
  <div class="def-container py-10 md:py-16">
    <div class="lg:mb-10 mb-6 w-fit mx-auto flex flex-col">
      <small class="self-end font-doto text-2xl font-bold">
        <MotionAnimatedText text="Get to Know me!" animation="fadeIn" stagger />
      </small>
      <h2 class="text-boss font-sora lg:text-6xl text-3xl w-full text-center font-semibold uppercase">
        Who’s Behind the Code?
      </h2>
    </div>
    <div class="grid lg:grid-cols-5 gap-5 mb-5">
      <div class="lg:rounded-[40px] rounded-[30px] bg-[#151515] flex flex-col justify-center lg:p-8 p-5 lg:col-span-3">
        <div class="text-white space-y-4 text-sm sm:text-base leading-relaxed">
          <p class="font-bold text-base sm:text-lg">
            Frontend Engineering + Interaction Design + Human-Centered Thinking
          </p>
          <p>
            Based in Karachi, Pakistan, I started my journey into software development in 2021 while pursuing a Bachelor’s in Computer Science, graduating in 2024.
          </p>
          <p>
            My work sits at the intersection of <strong>frontend engineering, interaction design, and human-centered thinking</strong>. I enjoy turning ideas and designs into responsive, intuitive digital experiences while thinking beyond just how something looks or works — and focusing on how people actually experience and interact with it.
          </p>
          <p>
            I work primarily with modern frontend technologies including <strong>JavaScript, React, Next.js, Vue, HTML, CSS, and Tailwind CSS</strong>, with a strong interest in UI/UX, interaction patterns, usability, and human-computer interaction.
          </p>
          <p>
            I’m particularly interested in understanding the relationship between <strong>people, technology, and interfaces</strong> — exploring how thoughtful design and engineering can make digital products clearer, more accessible, and easier to use.
          </p>
          <p>
            As I continue growing, I’m looking to deepen my understanding of <strong>HCI, interaction design, and human-centered product development</strong>, while continuing to build meaningful and technically solid digital experiences.
          </p>
        </div>
      </div>
      <div class="lg:col-span-2 lg:rounded-[40px] rounded-[30px] flex items-center justify-center bottom-conic w-full overflow-hidden">
        <div class="lg:rounded-[40px] rounded-[30px] overflow-hidden w-full h-full flex items-center justify-center">
          <video
            src="https://dl.dropboxusercontent.com/scl/fi/mmhqkhn85jg96fspp395n/aboutSecBg.mp4?rlkey=4vqe4swkg7reky3ik3tdzh71g&st=5omufuvp&raw=1"
            autoplay
            loop
            muted
            playsinline
            class="md:aspect-[9/14] aspect-[2/1] w-full h-full object-cover lg:rounded-[40px] rounded-[30px]"
          ></video>
        </div>
      </div>
    </div>
    <div class="flex flex-col-reverse md:grid lg:grid-cols-3 gap-5">
      <div class="lg:rounded-[40px] rounded-[30px] bg-snow overflow-hidden flex items-center justify-center">
        <video
          src="https://dl.dropboxusercontent.com/scl/fi/nzxdb0ie7tjk6t3ymjbya/flowsecBg.mp4?rlkey=jyvpz3h72u0bxhvqj3x43zq7n&st=dmb53z93&raw=1"
          autoplay
          loop
          muted
          playsinline
          class="md:aspect-[9/14] aspect-[2/1] h-full w-full object-cover lg:rounded-[40px] rounded-[30px]"
        ></video>
      </div>
      <div class="lg:col-span-2 lg:rounded-[40px] rounded-[30px] bg-[#151515] flex flex-col lg:p-8 p-5 w-full justify-center">
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
            <span><strong>Optimization:</strong> Optimize for performance (minify assets, lazy loading, caching, image
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