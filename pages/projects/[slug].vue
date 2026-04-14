<template>
  <div>
    <div v-if="pending" class="flex items-center justify-center min-h-[40vh] text-2xl font-bold text-boss">Loading...</div>
    <div v-else-if="!selectedProject" class="flex items-center justify-center min-h-[40vh] text-2xl font-bold text-red-600">Project not found.</div>
    <div v-else>
      <div class="h-full overflow-y-scroll">
        <Motion :initial="{ y: 50, opacity: 0 }" :animate="{ y: 0, opacity: 1 }" :exit="{ y: -30, opacity: 0 }"
          :transition="{ duration: 0.6, delay: 0.1, ease: 'easeOut' }" class="p-5 md:p-12 lg:p-16">

          <!-- Modal Header -->
          <div class="mb-8 relative">
            <NuxtLink to="/" data-pointer="close" class="absolute top-0 right-0 bg-boss text-white rounded-full px-4 py-2 text-sm hover:bg-boss/80 transition-all z-10">Go Back</NuxtLink>
            <Motion :initial="{ x: -100, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
              :exit="{ x: 50, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.3, ease: 'easeOut' }"
              class="flex sm:items-center sm:gap-6 gap-2 sm:flex-row flex-col sm:mb-6">
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
          <div class="space-y-8">
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
                <h2 class="text-boss font-doto md:text-2xl text-lg font-semibold mb-6">Key Features</h2>
                <div class="flex flex-wrap gap-4">
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
                  <Motion v-if="selectedProject?.illustration" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="uil:illustration" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Illustration</span>
                  </Motion>
                  <Motion v-if="selectedProject?.html" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="iconoir:html5" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">HTML</span>
                  </Motion>
                  <Motion v-if="selectedProject?.css" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="tdesign:css3" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">CSS</span>
                  </Motion>
                  <Motion v-if="selectedProject?.github" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="lucide:github" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">GitHub</span>
                  </Motion>
                  <Motion v-if="selectedProject?.lenis" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="carbon:smoothing-cursor" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Lenis</span>
                  </Motion>
                  <Motion v-if="selectedProject?.nuxt" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="lineicons:nuxt" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Nuxt.js</span>
                  </Motion>
                  <Motion v-if="selectedProject?.framer" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="ph:framer-logo" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Framer</span>
                  </Motion>
                  <Motion v-if="selectedProject?.tailwind" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="flowbite:tailwind-solid" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Tailwind CSS</span>
                  </Motion>
                  <Motion v-if="selectedProject?.python" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="proicons:python" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Python</span>
                  </Motion>
                  <Motion v-if="selectedProject?.gsap" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="simple-icons:gsap" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">GSAP</span>
                  </Motion>
                  <Motion v-if="selectedProject?.javascript" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="ri:javascript-fill" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">JavaScript</span>
                  </Motion>
                  <Motion v-if="selectedProject?.vuejs" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="mdi:vuejs" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">Vue.js</span>
                  </Motion>
                  <Motion v-if="selectedProject?.netlify" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="teenyicons:netlify-solid" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
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
                    <span class="font-doto text-white">Duration:</span>
                    <span class="text-white font-medium">{{ selectedProject?.duration }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-doto text-white">Status:</span>
                    <span class="text-white font-medium">{{ selectedProject?.status }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-doto text-white">Type:</span>
                    <span class="text-white font-medium">{{ selectedProject?.type }}</span>
                  </div>
                </div>
              </Motion>
            </Motion>

            <div v-if="selectedProject?.images" class="grid md:grid-cols-2 gap-10">
              <div v-for="(images, index) in selectedProject?.images" :key="index"
                :class="index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'">
                <img :src="images" class="rounded-3xl h-full w-full object-cover border border-snow border-dashed" alt="">
              </div>
            </div>
          </div>

        </Motion>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const scrollToPageTop = () => {
  if (!import.meta.client) return

  const nuxtApp = useNuxtApp()
  const lenis = nuxtApp.$lenis

  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(0, { immediate: true, force: true })
    return
  }

  window.scrollTo({ top: 0, behavior: 'auto' })
}

onMounted(() => {
  scrollToPageTop()
})

watch(() => route.fullPath, async () => {
  await nextTick()
  scrollToPageTop()
})

const { data: selectedProject, pending, error } = await useAsyncData('selectedProject', async () => {
  const slug = route.params.slug
  const slugToFile = {
    'art-agency': 'art-agency',
    'gec-pathways': 'gec-pathways',
    'codes-hawk': 'codes-hawk',
    'mr-tech-labs': 'mr-tech-labs',
    'ranked-designs': 'ranked-designs',
    'job-portal': 'job-portal',
    'college': 'college',
    'rechik': 'rechik',
  }
  const file = slugToFile[slug]
  if (!file) return null
  try {
    const project = await import(`~/data/projects/${file}.json`)
    return project.default || project
  } catch (e) {
    return null
  }
})
</script>