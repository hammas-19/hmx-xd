<template>
  <div class="">
    <div class="md:mt-40 mt-20 md:mb-16 mb-10 w-fit mx-auto flex flex-col items-center">
      <small class="self-end font-doto text-2xl font-bold">
        <MotionAnimatedText text="til today!" animation="fadeIn" stagger />
      </small>
      <h2 class="text-boss font-sora lg:text-6xl text-3xl w-full text-center font-semibold uppercase">
        Recent Performance
      </h2>

      <!-- Category Filter Tabs -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          :data-pointer="activeCategory === cat.id ? undefined : 'open'"
          class="relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-sora text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer select-none"
          :class="[
            activeCategory === cat.id
              ? 'bg-boss text-white shadow-lg shadow-boss/20 scale-105'
              : 'bg-black/5 hover:bg-black/10 text-boss/80 hover:text-boss border border-black/10 hover:border-black/20'
          ]"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Empty State for categories without projects -->
    <div v-if="filteredProjects.length === 0" class="def-container py-16 text-center">
      <div class="bg-white/80 border-2 border-dashed border-black/20 rounded-[35px] md:p-12 p-8 max-w-xl mx-auto backdrop-blur-sm">
        <Icon name="carbon:idea" class="w-12 h-12 mx-auto text-boss/60 mb-4" />
        <h3 class="font-sora text-2xl font-bold text-boss uppercase mb-2">Coming Soon</h3>
        <p class="font-sora text-sm text-boss/70">
          Playground experiments and fun builds are on the way. Check back soon!
        </p>
      </div>
    </div>

    <!-- Projects List -->
    <TransitionGroup
      v-else
      name="project-fade"
      tag="div"
      class="def-container md:space-y-32 space-y-10"
    >
      <Motion
        v-for="(project, index) in filteredProjects"
        :key="project.slug || index"
        :initial="{ opacity: 0, y: 60 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{
          duration: 0.45,
          delay: index * 0.08,
          ease: 'backOut'
        }"
        :while-hover="{
          y: -10,
          scale: 1.02,
        }"
        :while-tap="{ scale: 0.98 }"
        :viewport="{ once: true }"
        class="flex justify-center items-center w-full"
      >
        <NuxtLink :to="`/projects/${project.slug}`" class="w-full" style="text-decoration: none;">
          <div class="w-full relative cursor-pointer" data-pointer="open">
            <div class="w-full h-full absolute inset-0 top-conic md:rounded-[50px] rounded-[35px]" />
            <div
              class="border-4 md:rounded-[50px] rounded-[35px] border-black w-full bg-[#ffffff] hover:bg-transparent backdrop-blur-sm overflow-hidden"
            >
              <div class="md:py-10 py-2 md:px-5 px-2">
                <div class="flex justify-between">
                  <div class="flex flex-col gap-10">
                    <div class="flex items-center gap-5">
                      <template v-if="project.logo">
                        <img
                          :src="project.logo"
                          class="h-12 w-auto object-contain flex-shrink-0 md:rounded-xl rounded-2xl p-2"
                          :alt="project.name"
                        >
                      </template>
                      <template v-else>
                        <div class="h-12 w-12 flex items-center justify-center md:rounded-xl rounded-2xl p-2 bg-gray-200 text-black font-bold text-xl uppercase">
                          {{ project.name ? project.name[0] : '?' }}
                        </div>
                      </template>
                      <div class="flex gap-2 flex-col">
                        <span
                          v-if="project.category === 'completed'"
                          class="bg-[#c3fcb1] text-boss font-semibold w-fit px-2.5 py-0.5 text-xs rounded-full"
                        >
                          Completed
                        </span>
                        <span
                          v-else-if="project.category === 'in-progress'"
                          class="bg-[#f7c44c] text-boss font-semibold w-fit px-2.5 py-0.5 text-xs rounded-full"
                        >
                          Work In-progress
                        </span>
                        <span
                          v-else-if="project.category === 'drafted'"
                          class="bg-[#f9a04d] text-boss font-semibold w-fit px-2.5 py-0.5 text-xs rounded-full"
                        >
                          Drafted
                        </span>
                        <span
                          v-else-if="project.category === 'playground'"
                          class="bg-[#c084fc] text-white font-semibold w-fit px-2.5 py-0.5 text-xs rounded-full"
                        >
                          Playground
                        </span>
                        <span class="text-boss font-sora md:text-4xl sm:text-xl text-sm font-black uppercase">
                          {{ project.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- Arrow Button -->
                  <button
                    class="group relative flex size-10 items-center justify-center gap-1 rounded-lg w-full max-w-[40px] hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    type="button"
                    aria-label="View project details"
                  >
                    <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                    <div
                      class="relative size-1 origin-center rounded-full bg-black duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-black before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-black after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45"
                    />
                    <div class="size-1 rounded-full bg-black duration-300 group-hover:opacity-0" />
                  </button>
                </div>
              </div>

              <!-- Folder Shape -->
              <div class="flex flex-col md:rounded-[40px] rounded-[20px] overflow-hidden w-full">
                <div class="flex w-[45%] md:w-[30%] md:min-h-[33px] min-h-[20px]">
                  <div class="w-3/2 min-h-full bg-boss mb-[-1px] rounded-tr-sm" />
                  <div class="1/3 theCurve w-[70px] bg-boss min-h-full md:ml-[1-px] ml-[-2px] mb-[-1px]" />
                </div>
                <!-- Dynamic Data -->
                <div
                  class="md:min-h-[300px] bg-boss md:rounded-tr-[40px] rounded-tr-[20px] flex flex-col justify-end md:p-5 p-3 sm:gap-10 gap-5"
                >
                  <p class="text-white sm:text-xl text-xs md:font-medium line-clamp-3 uppercase">
                    {{ project.description }}
                  </p>
                  <!-- Technologies List -->
                  <div class="flex flex-wrap md:gap-3 gap-1">
                    <div
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="bg-white/10 md:p-2 p-1 rounded-2xl flex justify-center items-center"
                      :title="getTechInfo(tech).label"
                    >
                      <Icon
                        :name="getTechInfo(tech).icon"
                        class="md:min-h-[40px] min-h-[20px] md:min-w-[40px] min-w-[20px] text-bubbles"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </Motion>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project, ProjectCategory } from '~/composables/useProjects'
import { projectCategories } from '~/composables/useProjects'
import { getTechInfo } from '~/utils/techIcons'

const props = defineProps<{
  projects: Project[]
}>()

const categories = projectCategories
const activeCategory = ref<'all' | ProjectCategory>('all')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return props.projects
  }
  return props.projects.filter((p) => p.category === activeCategory.value)
})
</script>

<style scoped>
.theCurve {
  clip-path: polygon(0 0, 0 0, 100% 100%, 0% 100%);
}

/* Transition Group Animations for category filtering */
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.35s ease;
}

.project-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.project-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.project-fade-move {
  transition: transform 0.35s ease;
}
</style>