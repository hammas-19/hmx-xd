<template>
  <div class="bottom-conic def-padding-full">
    <div class="mt-40 md:mb-20 mb-14 w-fit mx-auto flex flex-col">
      <small class="self-end font-doto text-2xl font-bold">till today</small>
      <h2 class="text-boss font-sora lg:text-6xl text-3xl w-full text-center font-semibold uppercase">
        Recent Performance
      </h2>
    </div>
    <div class="def-container space-y-40">
      <div v-for="(project, index) in props.projects" :key="index" class="flex justify-center items-center">
        <Motion :initial="{ scale: 1, x: 0, y: 0 }" :animate="isModalOpen && selectedProject?.name === project.name ? {
          scale: 0.3,
          x: windowSize.width ? -windowSize.width * 0.35 : -400,
          y: windowSize.height ? -windowSize.height * 0.35 : -300,
          zIndex: 60
        } : { scale: 1, x: 0, y: 0, zIndex: 1 }" :transition="{ duration: 0.6, ease: 'easeInOut' }" class="w-full">
          <div class="border-4 md:rounded-[50px] rounded-[35px] border-black w-full top-conic overflow-hidden">
            <div class="py-10 px-5">
              <div class="flex justify-between">
                <div class="flex flex-col gap-10">
                  <div class="flex items-center gap-5">
                    <img :src="project.logo" class="h-12 w-fit object-cover rounded-xl bg-black p-2"
                      :alt="project.name">
                    <span class="text-boss font-sora md:text-4xl text-xl font-black uppercase">{{ project.name }}</span>
                  </div>
                </div>
                <!-- Arrow Button with click handler -->
                <button @click="openModal(project)"
                  class="group relative flex size-10 items-center justify-center gap-1 rounded-lg w-full max-w-[40px] hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                  <div
                    class="relative size-1 origin-center rounded-full bg-black duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-black before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-black after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45" />
                  <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                </button>
              </div>
            </div>

            <!-- Folder - Hidden when modal is open for this project -->
            <Motion :initial="{ opacity: 1, height: 'auto' }" :animate="isModalOpen && selectedProject?.name === project.name ? {
              opacity: 0,
              height: 0
            } : { opacity: 1, height: 'auto' }" :transition="{ duration: 0.4, ease: 'easeInOut' }">
              <div class="flex flex-col md:rounded-[40px] rounded-[20px] overflow-hidden w-full">
                <div class="flex w-[45%] md:w-[30%] min-h-[40px]">
                  <div class="w-3/2 min-h-full bg-boss mb-[-1px] rounded-tr-sm" />
                  <div class="1/3 theCurve w-[70px] bg-boss min-h-full md:ml-[1-px] ml-[-2px] mb-[-1px]" />
                </div>
                <!-- Dynamic Data -->
                <div
                  class="md:min-h-[300px] bg-boss md:rounded-tr-[40px] rounded-tr-[20px] flex flex-col justify-end p-5 md:gap-10 gap-5">
                  <p class="text-white md:text-xl font-medium">
                    {{ project.description }}
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <div v-if="project.illustration"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="uil:illustration"
                        class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                    </div>
                    <div v-if="project.github"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="lucide:github"
                        class="md:min-h-[40px] min-h-[25px] md:min-w-[40px] min-w-[25px] text-bubbles" />
                    </div>
                    <div v-if="project.nuxt"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
                      <Icon name="lineicons:nuxt"
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
                    <div v-if="project.vuejs"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center">
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
            </Motion>
          </div>
        </Motion>
      </div>
    </div>

    <!-- Modal -->
    <ClientOnly>
      <Teleport to="body">
        <Motion v-if="isModalOpen" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
          :transition="{ duration: 0.3 }"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click="closeModal">
          <Motion :initial="{ scale: 0.8, opacity: 0 }" :animate="{ scale: 1, opacity: 1 }"
            :exit="{ scale: 0.8, opacity: 0 }" :transition="{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }"
            class="relative w-full h-full bg-white overflow-hidden" @click.stop>
            <!-- Close Button -->
            <Motion :initial="{ opacity: 0, rotate: -90 }" :animate="{ opacity: 1, rotate: 0 }"
              :transition="{ duration: 0.4, delay: 0.5 }" class="absolute top-6 right-6 z-10">
              <button @click="closeModal"
                class="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </Motion>

            <!-- Scrollable Content -->
            <div class="h-full overflow-y-auto">
              <Motion :initial="{ y: 50, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.6, delay: 0.4 }" class="p-8 md:p-12 lg:p-16">
                <!-- Modal Header -->
                <div class="mb-8">
                  <Motion :initial="{ x: -50, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
                    :transition="{ duration: 0.5, delay: 0.6 }" class="flex items-center gap-6 mb-6">
                    <img v-if="selectedProject?.logo" :src="selectedProject.logo"
                      class="h-16 w-fit object-cover rounded-xl bg-black p-3" :alt="selectedProject.name">
                    <h1 class="text-boss font-sora text-4xl md:text-6xl font-black uppercase">
                      {{ selectedProject?.name }}
                    </h1>
                  </Motion>
                </div>

                <!-- Modal Content -->
                <div class="space-y-8">
                  <!-- Project Description -->
                  <Motion :initial="{ y: 30, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.5, delay: 0.7 }" class="bg-boss rounded-3xl p-8">
                    <h2 class="text-white font-sora text-2xl font-semibold mb-4">Description</h2>
                    <p class="text-white text-lg leading-relaxed">
                      {{ selectedProject?.description }}
                    </p>
                  </Motion>

                  <!-- Technologies Used -->
                  <Motion :initial="{ y: 30, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.5, delay: 0.8 }" class="bg-gray-50 rounded-3xl p-8">
                    <h2 class="text-boss font-sora text-2xl font-semibold mb-6">Technologies Used</h2>
                    <div class="flex flex-wrap gap-4">
                      <Motion v-if="selectedProject?.illustration" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 0.9 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="uil:illustration" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">Illustration</span>
                      </Motion>
                      <Motion v-if="selectedProject?.github" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.0 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="lucide:github" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">GitHub</span>
                      </Motion>
                      <Motion v-if="selectedProject?.nuxt" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.1 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="lineicons:nuxt" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">Nuxt.js</span>
                      </Motion>
                      <Motion v-if="selectedProject?.tailwind" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.2 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="flowbite:tailwind-solid" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">Tailwind CSS</span>
                      </Motion>
                      <Motion v-if="selectedProject?.python" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.3 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="proicons:python" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">Python</span>
                      </Motion>
                      <Motion v-if="selectedProject?.javascript" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.4 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="ri:javascript-fill" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">JavaScript</span>
                      </Motion>
                      <Motion v-if="selectedProject?.vuejs" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.5 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="mdi:vuejs" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">Vue.js</span>
                      </Motion>
                      <Motion v-if="selectedProject?.netlify" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.6 }"
                        class="bg-boss/10 p-3 rounded-2xl flex items-center gap-3">
                        <Icon name="teenyicons:netlify-solid" class="h-8 w-8 text-boss" />
                        <span class="text-boss font-medium">Netlify</span>
                      </Motion>
                    </div>
                  </Motion>

                  <!-- Project Details Section -->
                  <Motion :initial="{ y: 30, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.5, delay: 0.9 }" class="grid md:grid-cols-2 gap-8">
                    <div class="bg-boss rounded-3xl p-8">
                      <h3 class="text-white font-sora text-xl font-semibold mb-4">Key Features</h3>
                      <ul class="text-white space-y-2">
                        <li class="flex items-start gap-2">
                          <span class="text-bubbles">•</span>
                          <span>Feature description goes here</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span class="text-bubbles">•</span>
                          <span>Another feature description</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span class="text-bubbles">•</span>
                          <span>Third feature description</span>
                        </li>
                      </ul>
                    </div>

                    <div class="bg-gray-50 rounded-3xl p-8">
                      <h3 class="text-boss font-sora text-xl font-semibold mb-4">Project Stats</h3>
                      <div class="space-y-4">
                        <div class="flex justify-between">
                          <span class="text-gray-600">Duration:</span>
                          <span class="text-boss font-medium">3 months</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-gray-600">Status:</span>
                          <span class="text-boss font-medium">Completed</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-gray-600">Type:</span>
                          <span class="text-boss font-medium">Web Application</span>
                        </div>
                      </div>
                    </div>
                  </Motion>

                  <!-- Call to Action -->
                  <Motion :initial="{ y: 30, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.5, delay: 1.0 }" class="bg-boss rounded-3xl p-8 text-center">
                    <h3 class="text-white font-sora text-xl font-semibold mb-4">Want to see more?</h3>
                    <div class="flex gap-4 justify-center">
                      <Motion :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.2 }"
                        class="bg-white text-boss px-6 py-3 rounded-2xl font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                        Live Demo
                      </Motion>
                      <Motion :initial="{ scale: 0 }" :animate="{ scale: 1 }"
                        :transition="{ duration: 0.3, delay: 1.3 }"
                        class="bg-bubbles text-white px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity cursor-pointer">
                        View Code
                      </Motion>
                    </div>
                  </Motion>
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
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

const isModalOpen = ref(false)
const selectedProject = ref(null)

// Reactive window size with default values for SSR
const windowSize = reactive({
  width: 1200, // Default width
  height: 800  // Default height
})

// Update window size function
const updateWindowSize = () => {
  if (typeof window !== 'undefined') {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight
  }
}

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
  setTimeout(() => {
    selectedProject.value = null
  }, 600) // Wait for animation to complete
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
  // Update window size on mount
  updateWindowSize()
  // Add event listeners
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateWindowSize)
    window.addEventListener('keydown', handleEscapeKey)
  }
})

onBeforeUnmount(() => {
  // Clean up event listeners
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowSize)
    window.removeEventListener('keydown', handleEscapeKey)
  }
})
</script>

<style scoped>
.theCurve {
  clip-path: polygon(0 0, 0 0, 100% 100%, 0% 100%);
}
</style>