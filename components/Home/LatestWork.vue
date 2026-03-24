<template>
  <div class="">
    <div class="md:mt-40 mt-20 md:mb-20 mb-14 w-fit mx-auto flex flex-col">
      <small class="self-end font-doto text-2xl font-bold">
        <MotionAnimatedText text="til today!" animation="fadeIn" stagger />
      </small>
      <h2 class="text-boss font-sora lg:text-6xl text-3xl w-full text-center font-semibold uppercase">
        Recent Performance
      </h2>
    </div>
    <div class="def-container md:space-y-32 space-y-10">
      <Motion v-for="(project, index) in props.projects" :key="index" :initial="{ opacity: 0, y: 100 }"
        :while-in-view="{ opacity: 1, y: 0 }" :transition="{
          duration: 0.5,
          delay: index * 0.1,
          ease: 'backOut'
        }" :while-hover="{
        y: -10,
        scale: 1.02,
      }" :while-tap="{ scale: 0.98 }" :viewport="{ once: true }" class="flex justify-center items-center">
        <NuxtLink :to="`/projects/${project.slug}`" class="w-full" style="text-decoration: none;">
          <div class="w-full relative cursor-pointer" data-pointer="open">
            <div class="w-full h-full absolute inset-0 top-conic md:rounded-[50px] rounded-[35px]" />
            <div
              class="border-4 md:rounded-[50px] rounded-[35px] border-black w-full bg-[#ffffff] hover:bg-transparent  backdrop-blur-sm overflow-hidden">
              <div class="md:py-10 py-2 md:px-5 px-2 ">
                <div class="flex justify-between">
                  <div class="flex flex-col gap-10">
                    <div class="flex items-center gap-5">
                      <template v-if="project.logo">
                        <img :src="project.logo" class="h-12 w-fit object-cover md:rounded-xl rounded-2xl p-2" :alt="project.name">
                      </template>
                      <template v-else>
                        <div class="h-12 w-12 flex items-center justify-center md:rounded-xl rounded-2xl p-2 bg-gray-200 text-black font-bold text-xl uppercase">
                          {{ project.name ? project.name[0] : '?' }}
                        </div>
                      </template>
                      <div class="flex gap-2 flex-col">
                        <span v-if="project.inProgress" class="bg-[#f7c44c] w-fit px-2.5 py-0.5 text-xs rounded-full">Work In-progress</span>
                        <span class="text-boss font-sora md:text-4xl sm:text-xl text-sm font-black uppercase">{{
                          project.name }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- Arrow Button with click handler -->
                  <button
                    class="group relative flex size-10 items-center justify-center gap-1 rounded-lg w-full max-w-[40px] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    type="button">
                    <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                    <div
                      class="relative size-1 origin-center rounded-full bg-black duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-black before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-black after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45" />
                    <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                  </button>
                </div>
              </div>

              <!-- Folder -->
              <div class="flex flex-col md:rounded-[40px] rounded-[20px] overflow-hidden w-full">
                <div class="flex w-[45%] md:w-[30%] md:min-h-[33px] min-h-[20px]">
                  <div class="w-3/2 min-h-full bg-boss mb-[-1px] rounded-tr-sm" />
                  <div class="1/3 theCurve w-[70px] bg-boss min-h-full md:ml-[1-px] ml-[-2px] mb-[-1px]" />
                </div>
                <!-- Dynamic Data -->
                <div
                  class="md:min-h-[300px] bg-boss md:rounded-tr-[40px] rounded-tr-[20px] flex flex-col justify-end md:p-5 p-3 sm:gap-10 gap-5">
                  <p class="text-white sm:text-xl text-xs md:font-medium line-clamp-3 uppercase">
                    {{ project.description }}
                  </p>
                  <div class="flex flex-wrap md:gap-3 gap-1">
                    <div v-if="project.illustration"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="uil:illustration"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.html" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="iconoir:html5"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.css" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="tdesign:css3"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.github"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="lucide:github"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.lenis"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="carbon:smoothing-cursor"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.nuxt" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="lineicons:nuxt"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.framer"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="ph:framer-logo"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.tailwind"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="flowbite:tailwind-solid"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.python"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="proicons:python"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.gsap"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="simple-icons:gsap"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.javascript"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="ri:javascript-fill"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.vuejs" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="mdi:vuejs"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                    <div v-if="project.netlify"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="teenyicons:netlify-solid"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </Motion>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const isModalOpen = ref(false)
const selectedProject = ref(null)

const closeModal = () => {
  isModalOpen.value = false
  // Add a small delay before clearing selectedProject to allow exit animation
  setTimeout(() => {
    selectedProject.value = null
  }, 500)
  // Restore body scroll
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'auto'
  }
}

// Close modal on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Lifecycle hooks
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleEscapeKey)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleEscapeKey)
  }
})
</script>

<style scoped>
.theCurve {
  clip-path: polygon(0 0, 0 0, 100% 100%, 0% 100%);
}
</style>