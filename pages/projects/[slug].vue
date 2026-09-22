<template>
  <div>
    <div v-if="pending" class="flex items-center justify-center min-h-[40vh] text-2xl font-bold text-boss">Loading...</div>
    <div v-else-if="!selectedProject" class="flex items-center justify-center min-h-[40vh] text-2xl font-bold text-red-600">Project not found.</div>
    <div v-else>
      <div class="h-full overflow-y-scroll">
        <Motion :initial="{ y: 50, opacity: 0 }" :animate="{ y: 0, opacity: 1 }" :exit="{ y: -30, opacity: 0 }"
          :transition="{ duration: 0.6, delay: 0.1, ease: 'easeOut' }" class="p-5 md:p-12 lg:p-16">

          <!-- Header -->
          <div class="mb-8 relative">
            <NuxtLink to="/" data-pointer="close" class="absolute top-0 right-0 bg-boss text-white rounded-full px-4 py-2 text-sm hover:bg-boss/80 transition-all z-10">Go Back</NuxtLink>
            <Motion :initial="{ x: -100, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
              :exit="{ x: 50, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.3, ease: 'easeOut' }"
              class="flex sm:items-center sm:gap-6 gap-2 sm:flex-row flex-col sm:mb-6">
              <img v-if="selectedProject?.logo" :src="selectedProject.logo"
                class="h-16 w-auto object-contain flex-shrink-0 rounded-xl p-2" :alt="selectedProject.name">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <span
                    v-if="selectedProject.category === 'completed'"
                    class="bg-[#c3fcb1] text-boss font-semibold w-fit px-3 py-0.5 text-xs rounded-full"
                  >
                    Completed
                  </span>
                  <span
                    v-else-if="selectedProject.category === 'in-progress'"
                    class="bg-[#f7c44c] text-boss font-semibold w-fit px-3 py-0.5 text-xs rounded-full"
                  >
                    Work In-progress
                  </span>
                  <span
                    v-else-if="selectedProject.category === 'drafted'"
                    class="bg-[#f9a04d] text-boss font-semibold w-fit px-3 py-0.5 text-xs rounded-full"
                  >
                    Drafted
                  </span>
                  <span
                    v-else-if="selectedProject.category === 'playground'"
                    class="bg-[#c084fc] text-white font-semibold w-fit px-3 py-0.5 text-xs rounded-full"
                  >
                    Playground
                  </span>
                </div>
                <h1 data-pointer="site"
                  class="text-boss font-sora sm:text-4xl text-2xl md:text-6xl font-black uppercase cursor-grabbing">
                  <a :href="selectedProject?.link" target="_blank" rel="noopener noreferrer">
                    {{ selectedProject?.name }}
                  </a>
                  <Icon name="pixelarticons:arrow-right" class="min-h-6 min-w-6 text-boss -rotate-45" />
                </h1>
              </div>
            </Motion>
          </div>

          <!-- Content -->
          <div class="space-y-8">
            <!-- Project Description & Key Features -->
            <div class="flex md:gap-10 gap-5 md:flex-row flex-col">
              <Motion :initial="{ y: 60, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                :exit="{ y: -30, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.4, ease: 'easeOut' }"
                class="bg-black rounded-3xl md:p-8 p-5 md:flex-1">
                <h2 class="text-white font-doto md:text-2xl text-lg font-semibold mb-4">Description</h2>
                <p class="text-white md:text-lg text-sm leading-relaxed">
                  {{ selectedProject?.description }}
                </p>
              </Motion>
              <div class="bg-snow rounded-3xl md:p-8 p-5 md:flex-1">
                <h2 class="text-boss font-doto md:text-2xl text-lg font-semibold mb-6">Key Features</h2>
                <div class="flex flex-wrap gap-4">
                  <div v-for="(achievement, aIndex) in selectedProject?.achievements" :key="aIndex"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1">
                    <Icon name="carbon:trophy" class="md:min-h-7 min-h-4 md:min-w-7 min-w-4 text-boss" />
                    <span class="text-boss md:text-lg text-sm font-medium">{{ achievement }}</span>
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
                  <Motion
                    v-for="(tech, tIndex) in selectedProject?.technologies"
                    :key="tech"
                    :initial="{ opacity: 0, y: 15 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.3, delay: tIndex * 0.04, ease: 'easeOut' }"
                    class="bg-boss/10 p-3 rounded-2xl flex items-center md:gap-3 gap-1"
                  >
                    <Icon :name="getTechInfo(tech).icon" class="h-8 w-8 text-boss md:min-h-7 min-h-4 md:min-w-7 min-w-4" />
                    <span class="md:text-lg text-sm text-boss font-medium">{{ getTechInfo(tech).label }}</span>
                  </Motion>
                </div>
              </Motion>

              <!-- Stats -->
              <Motion :initial="{ x: 50, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
                :exit="{ x: 25, opacity: 0 }" :transition="{ duration: 0.5, delay: 0.8, ease: 'easeOut' }"
                class="bg-black rounded-3xl md:p-8 p-5">
                <h3 class="text-snow md:text-2xl text-lg font-semibold mb-4 font-doto">Project Stats</h3>
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="font-doto text-white">Category:</span>
                    <span class="text-white font-medium capitalize">{{ selectedProject?.category }}</span>
                  </div>
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

            <!-- Project Images Grid -->
            <div v-if="selectedProject?.images && selectedProject.images.length" class="grid md:grid-cols-2 gap-10">
              <div v-for="(image, index) in selectedProject.images" :key="index"
                :class="index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'">
                <img :src="image" class="rounded-3xl h-full w-full object-cover border border-snow border-dashed" :alt="`${selectedProject.name} preview ${index + 1}`">
              </div>
            </div>
          </div>

        </Motion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch, nextTick } from 'vue'
import { useProjects } from '~/composables/useProjects'
import { getTechInfo } from '~/utils/techIcons'

const route = useRoute()
const { getProjectBySlug } = useProjects()

const scrollToPageTop = () => {
  if (!import.meta.client) return

  const nuxtApp = useNuxtApp()
  const lenis = nuxtApp.$lenis as any

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

const slug = computed(() => route.params.slug as string)

const { data: selectedProject, pending, error } = await useAsyncData(
  () => `project-${slug.value}`,
  () => Promise.resolve(getProjectBySlug(slug.value) || null),
  {
    watch: [slug]
  }
)
</script>