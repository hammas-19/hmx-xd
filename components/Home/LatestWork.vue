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
        <div class="w-full relative cursor-pointer" data-pointer="open" @click="openModal(project)">
          <div class="w-full h-full absolute inset-0 top-conic md:rounded-[50px] rounded-[35px]" />
          <div
            class="border-4 md:rounded-[50px] rounded-[35px] border-black w-full bg-[#ffffff] hover:bg-transparent  backdrop-blur-sm overflow-hidden">
            <div class="md:py-10 py-2 md:px-5 px-2 ">
              <div class="flex justify-between">
                <div class="flex flex-col gap-10">
                  <div class="flex items-center gap-5">
                    <img :src="project.logo" class="h-12 w-fit object-cover rounded-xl p-2" :alt="project.name">
                    <span class="text-boss font-sora md:text-4xl sm:text-xl text-sm font-black uppercase">{{
                      project.name }}</span>
                  </div>
                </div>
                <!-- Arrow Button with click handler -->
                <button
                  class="group relative flex size-10 items-center justify-center gap-1 rounded-lg w-full max-w-[40px] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  @click="openModal(project)">
                  <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                  <div
                    class="relative size-1 origin-center rounded-full bg-black duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-black before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-black after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45" />
                  <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                </button>
              </div>
            </div>

            <!-- Folder -->
            <div class="flex flex-col md:rounded-[40px] rounded-[20px] overflow-hidden w-full">
              <div class="flex w-[45%] md:w-[30%] min-h-[40px]">
                <div class="w-3/2 min-h-full bg-boss mb-[-1px] rounded-tr-sm" />
                <div class="1/3 theCurve w-[70px] bg-boss min-h-full md:ml-[1-px] ml-[-2px] mb-[-1px]" />
              </div>
              <!-- Dynamic Data -->
              <div
                class="md:min-h-[300px] bg-boss md:rounded-tr-[40px] rounded-tr-[20px] flex flex-col justify-end p-5 sm:gap-10 gap-5">
                <p class="text-white sm:text-xl text-xs font-medium line-clamp-3">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-3">
                  <div v-if="project.illustration"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="uil:illustration"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.html" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="iconoir:html5"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.css" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="tdesign:css3"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.github"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="lucide:github"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.nuxt" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="lineicons:nuxt"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.framer"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="ph:framer-logo"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.tailwind"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="flowbite:tailwind-solid"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.python"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="proicons:python"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.javascript"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="ri:javascript-fill"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.vuejs" class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="mdi:vuejs"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                  <div v-if="project.netlify"
                    class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                    <Icon name="teenyicons:netlify-solid"
                      class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </div>

    <!-- Modal -->
    <ClientOnly>
      <Teleport to="body">
        <Motion v-if="isModalOpen" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click="closeModal">

          <Motion :initial="{ scale: 0.7, opacity: 0, rotateX: -15 }" :animate="{ scale: 1, opacity: 1, rotateX: 0 }"
            :exit="{ scale: 0.8, opacity: 0, rotateX: 15 }" :transition="{
              duration: 0.5,
              ease: 'easeOut',
              scale: { type: 'spring', stiffness: 300, damping: 25 }
            }" class="relative w-full h-full bg-white overflow-hidden" @click.stop>

            <!-- Close Button -->
            <Motion :initial="{ opacity: 0, scale: 0, rotate: -180 }" :animate="{ opacity: 1, scale: 1, rotate: 0 }"
              :exit="{ opacity: 0, scale: 0, rotate: 180 }" :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
              class="absolute top-6 right-6 z-10">
              <button data-pointer="close"
                class="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 hover:scale-110"
                @click="closeModal">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Motion>

            <!-- Scrollable Content -->
            <div class="h-full overflow-y-auto">
              <Motion :initial="{ y: 50, opacity: 0 }" :animate="{ y: 0, opacity: 1 }" :exit="{ y: -30, opacity: 0 }"
                :transition="{ duration: 0.6, delay: 0.1, ease: 'easeOut' }" class="p-5 md:p-12 lg:p-16">
                <!-- Modal Header -->
                <div class="mb-8 ">
                  <Motion :initial="{ x: -100, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
                    :exit="{ x: 50, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.3, ease: 'easeOut' }"
                    class="flex sm:items-center sm:gap-6 gap-2 sm:flex-row flex-col sm:mb-6 ">
                    <img v-if="selectedProject?.logo" :src="selectedProject.logo"
                      class="h-16 w-fit object-cover rounded-xl p-2" :alt="selectedProject.name">
                    <h1 data-pointer="site"
                      class="text-boss font-sora sm:text-4xl text-2xl md:text-6xl font-black uppercase cursor-grabbing">
                      <a :href="selectedProject?.link" target="_blank">
                        {{ selectedProject?.name }}
                      </a>
                      <Icon name="pixelarticons:arrow-right" class="min-h-6 min-w-6 text-boss -rotate-45" />
                    </h1>
                  </Motion>
                </div>

                <!-- Modal Content -->
                <div class="space-y-8 ">
                  <!-- Project Description -->
                  <div class="flex md:gap-10 gap-5 md:flex-row flex-col">

                    <Motion :initial="{ y: 60, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                      :exit="{ y: -30, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.4, ease: 'easeOut' }"
                      class="bg-black rounded-3xl md:p-8 p-5">
                      <h2 class="text-white font-doto md:text-2xl text-lg font-semibold mb-4">Description</h2>
                      <p class="text-white md:text-lg text-sm leading-relaxed">
                        {{ selectedProject?.description }}
                      </p>
                    </Motion>
                    <div class="bg-snow rounded-3xl md:p-8 p-5">
                      <h2 class="text-boss font-doto md:text-2xl text-lg font-semibold mb-6">Key Features
                      </h2>
                      <div class="flex flex-wrap gap-4 ">
                        <div v-for="(achievements, aIndex) in selectedProject?.achievements" :key="aIndex"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="carbon:trophy" class="md:min-h-7 min-h-4 md:min-w-7 min-w-4 text-boss" />
                          <span class="text-boss md:text-lg text-sm font-medium">{{ achievements }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Project Details Section -->
                  <Motion :initial="{ y: 60, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :exit="{ y: -30, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.6, ease: 'easeOut' }"
                    class="grid md:grid-cols-3 gap-8">
                    <!-- Technologies Used -->
                    <Motion :initial="{ y: 60, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                      :exit="{ y: -30, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.5, ease: 'easeOut' }"
                      class="bg-snow rounded-3xl md:p-8 p-5 md:col-span-2">
                      <h2 class="text-boss font-doto md:text-2xl text-lg font-semibold mb-6">Technologies Used</h2>
                      <div class="flex flex-wrap gap-4">
                        <Motion v-if="selectedProject?.illustration" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 0.6, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="uil:illustration"
                            class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">Illustration</span>
                        </Motion>
                        <Motion v-if="selectedProject?.github" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 0.7, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="lucide:github" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">GitHub</span>
                        </Motion>
                        <Motion v-if="selectedProject?.nuxt" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 0.8, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="lineicons:nuxt" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">Nuxt.js</span>
                        </Motion>
                        <Motion v-if="selectedProject?.tailwind" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 0.9, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="flowbite:tailwind-solid"
                            class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">Tailwind CSS</span>
                        </Motion>
                        <Motion v-if="selectedProject?.python" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 1.0, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="proicons:python"
                            class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">Python</span>
                        </Motion>
                        <Motion v-if="selectedProject?.javascript" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 1.1, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="ri:javascript-fill"
                            class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">JavaScript</span>
                        </Motion>
                        <Motion v-if="selectedProject?.vuejs" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 1.2, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="mdi:vuejs" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">Vue.js</span>
                        </Motion>
                        <Motion v-if="selectedProject?.netlify" :initial="{ scale: 0, rotate: -180 }"
                          :animate="{ scale: 1, rotate: 0 }" :exit="{ scale: 0, rotate: 180 }"
                          :transition="{ duration: 0.4, delay: 1.3, type: 'spring', stiffness: 300 }"
                          class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                          <Icon name="teenyicons:netlify-solid"
                            class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                          <span class="md:text-lg text-sm text-boss font-medium">Netlify</span>
                        </Motion>
                      </div>
                    </Motion>
                    <Motion :initial="{ x: 50, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
                      :exit="{ x: 25, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.8, ease: 'easeOut' }"
                      class="bg-black rounded-3xl md:p-8 p-5">
                      <h3 class="text-snow md:text-2xl text-lg font-semibold mb-4 font-doto">Project Stats</h3>
                      <div class="space-y-4">
                        <div class="flex justify-between">
                          <span class="font-doto  text-white">Duration:</span>
                          <span class="text-white font-medium">{{ selectedProject?.duration }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="font-doto  text-white">Status:</span>
                          <span class="text-white font-medium">{{ selectedProject?.status }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="font-doto  text-white">Type:</span>
                          <span class="text-white font-medium">{{ selectedProject?.type }}</span>
                        </div>
                      </div>
                    </Motion>
                  </Motion>
                  <div v-if="selectedProject?.images" class="grid md:grid-cols-2 gap-10">
                    <div v-for="(images, index) in selectedProject?.images" :key="index"
                      :class="index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'">
                      <img :src="images" class="rounded-3xl h-full w-full object-cover border border-snow border-dashed"
                        alt="">
                    </div>
                  </div>
                </div>
              </Motion>
            </div>
          </Motion>
        </Motion>
      </Teleport>
    </ClientOnly>
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

const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
  // Prevent body scroll when modal is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

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