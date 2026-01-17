<template>
  <div>
    <TheNavbar>
      <template #work>
        <NuxtLink data-pointer="link" to="#work">
          Work
        </NuxtLink>
      </template>
      <template #about>
        <NuxtLink data-pointer="link" to="#about">
          About
        </NuxtLink>
      </template>
      <template #flow>
        <NuxtLink data-pointer="link" to="#about">
          Flow
        </NuxtLink>
      </template>
      <template #connect>
        <NuxtLink to="#connect">
          Connect
        </NuxtLink>
      </template>
    </TheNavbar>
    <HomeHero />
    <!-- Minimal Connection Status (Top Right) + QR Modal -->
    <ClientOnly>
      <!-- Connection Badge (Always Visible) -->
      <div class="fixed top-4 right-4 z-50">
        <div
          class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border"
          :class="isConnected ? 'bg-green-900/20 text-green-300 border-green-600/30' : 'bg-red-900/20 text-red-300 border-red-600/30'"
        >
          <span class="w-2 h-2 rounded-full" :class="isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400 animate-pulse'" />
          {{ isConnected ? 'Ready' : 'Connecting' }}
        </div>
      </div>

      <!-- QR Modal Popup -->
      <Transition name="fade">
        <div v-if="sessionShown" class="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
          <div class="bg-slate-800 border border-slate-700 rounded-lg p-8 max-w-md w-full shadow-xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-white">Scan to Control</h2>
              <button
                class="text-gray-400 hover:text-white transition-colors"
                @click="sessionShown = false"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- QR Container -->
            <div class="flex justify-center mb-6">
              <div ref="qrContainer" class="bg-white p-4 rounded-lg" />
            </div>

            <!-- Instructions -->
            <p class="text-xs text-gray-400 text-center mb-4">
              Scan with your phone to open the controller
            </p>

            <!-- Fallback Link -->
            <a
              :href="controllerUrl"
              target="_blank"
              rel="noopener"
              class="w-full block text-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium text-white"
            >
              Open Controller
            </a>

            <!-- Close Button -->
            <button
              class="w-full mt-3 px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium text-white"
              @click="sessionShown = false"
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </ClientOnly>
    <div id="work">
      <HomeLatestWork :projects="projects" />
    </div>
    <div id="about">
      <HomeAbout />
    </div>
    <div id="connect">
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useSecondScreen } from '~/composables/useSecondScreen'
// Enhanced SEO Meta Tags
useSeoMeta({
  title: 'Hammas Masood - Frontend Developer Portfolio',
  description: 'Portfolio showcasing modern web development projects including e-commerce platforms, PWAs, and educational websites built with Vue.js, Nuxt.js, and Python.',
  ogTitle: 'Hammas Masood - Frontend Developer Portfolio',
  ogDescription: 'Portfolio showcasing modern web development projects including e-commerce platforms, PWAs, and educational websites.',
  ogImage: '/og-image.jpg',
  ogUrl: 'https://hammasmasood.netlify.app/',
  twitterTitle: 'Hammas Masood - Frontend Developer Portfolio',
  twitterDescription: 'Portfolio showcasing modern web development projects built with Vue.js, Nuxt.js, and Python.',
  twitterImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// SecondScreen viewer setup
const { isConnected, joinSession, leaveSession, watchConnectionStatus, onConnected, onScrollPosition } = useSecondScreen()
const qrContainer = ref<HTMLDivElement | null>(null)
const sessionShown = ref(false)
const viewerSessionId = ref('')
const controllerUrl = computed(() => {
  if (!viewerSessionId.value) return ''
  if (import.meta.client) {
    return `${window.location.origin}/controller/${viewerSessionId.value}`
  }
  return `/controller/${viewerSessionId.value}`
})

const genId = () => Math.random().toString(36).slice(2, 10)

onMounted(() => {
  // Create and join a session as the viewer when socket connects
  viewerSessionId.value = genId()
  onConnected(() => joinSession(viewerSessionId.value))
  watchConnectionStatus()

  // Apply incoming scroll positions directly to the page
  onScrollPosition((pos: number) => {
    if (import.meta.client) {
      window.scrollTo({ top: Math.max(0, pos), behavior: 'auto' })
    }
  })

  // Generate QR when toggled on
  watch(sessionShown, async (shown) => {
    if (!shown) return
    await nextTick()
    if (!qrContainer.value) {
      console.warn('[viewer] qrContainer not found')
      return
    }
    // Clear previous canvas
    qrContainer.value.innerHTML = ''
    try {
      const mod = await import('qrcode')
      const QRCode = mod.default || mod
      const canvas = document.createElement('canvas')
      await QRCode.toCanvas(canvas, controllerUrl.value, { width: 180 })
      qrContainer.value.appendChild(canvas)
      console.log('[viewer] QR generated for:', controllerUrl.value)
    } catch (err) {
      console.warn('[viewer] QR generation failed, fallback link only', err)
    }
  }, { immediate: false })

  // Auto-show QR modal on mount
  sessionShown.value = true
})

onUnmounted(() => {
  leaveSession()
})

const projects = [
  {
    name: 'Codes Hawk',
    logo: '/projects/codesHawk/logo.jpeg',
    description: 'CodesHawk delivers cutting-edge web, AI, and digital marketing solutions that propel your business forward.',
    achievements: ['Creative Design', 'Animations', 'Solo Development', 'Portfolio'],
    images: [
      '/projects/codesHawk/1.jpg',
      '/projects/codesHawk/2.jpg',
      '/projects/codesHawk/3.jpg',
      '/projects/codesHawk/4.jpg',
      '/projects/codesHawk/5.jpg'
    ],
    javascript: true,
    netlify: true,
    github: true,
    nuxt: true,
    vuejs: true,
    framer: true,
    css: true,
    tailwind: true,
    type: 'Portfolio',
    status: 'On stage',
    duration: '---',
    link: 'https://codeshawk.com/',
  },
  {
    name: 'Ranked Designs',
    logo: '/projects/rankedDesigns/logo.webp',
    description: 'Ranked Designs delivers top-quality services with a team of experts who know how to make your brand stand out. We use the best tools and strategies to create solutions that are affordable, effective, and tailored to your needs. From websites to marketing materials, we handle everything to save you time and effort.',
    achievements: ['Creative Design', 'Animations', 'Solo Development', 'Short Deadline Success'],
    images: [
      '/projects/rankedDesigns/1.jpg',
      '/projects/rankedDesigns/2.jpg',
      '/projects/rankedDesigns/3.jpg',
      '/projects/rankedDesigns/4.jpg',
      '/projects/rankedDesigns/5.jpg',
      '/projects/rankedDesigns/6.jpg'
    ],
    javascript: true,
    netlify: true,
    github: true,
    html: true,
    css: true,
    tailwind: true,
    type: 'Portfolio',
    status: 'Completed',
    duration: '10 Days',
    link: 'https://rankeddesigns.com/',
  },
  {
    name: 'Job Portal',
    logo: '/projects/jobPortal/jobPortal.webp',
    description: ' Al Nafi Job Portal is a project of Al Nafi International College, designed to bridge the gap between employers and students or job candidates. It provides a seamless platform where employers can find skilled talent, and students or candidates can discover meaningful job and internship opportunities. The portal aims to simplify the recruitment process by connecting the right people with the right opportunities efficiently.',
    achievements: ['PWA', 'Microservice Architecture', 'Cross-team Collaboration', 'Short Deadline Success'],
    images: [
      '/projects/jobPortal/1.jpg',
      '/projects/jobPortal/3.jpg',
      '/projects/jobPortal/4.jpg',
      '/projects/jobPortal/6.jpg',
      '/projects/jobPortal/7.jpg',
      '/projects/jobPortal/2.jpg'
    ],
    vuejs: true,
    javascript: true,
    nuxt: true,
    illustration: false,
    github: true,
    tailwind: true,
    python: true,
    type: 'Progressive Web App',
    status: 'On stage',
    duration: '45 Days',
    link: 'https://stage-jobportal.alnafi.com/',
  },
  {
    name: 'College',
    logo: '/projects/islamicCollege/islamicCollegeLogo.svg',
    description: ' Al Nafi Islamic College is an educational institution dedicated to producing the next generation of traditionally trained scholars and leaders. Our mission is to serve as a leading model for traditional Islamic education globally through a balanced blend of spiritual training and academic studies. We empower our youth to grow into scholarly, self-sufficient, and spiritually grounded leaders who excel both in their faith and in the modern professional world. In addition to our classical Islamic studies, we teach our scholars the worldly skills necessary to excel in professional environments. Our dual-track system integrates modern qualifications, ensuring that our graduates are as capable in the workplace as they are in their spiritual endeavors.',
    achievements: ['PWA', 'Microservice Architecture', 'Cross-team Collaboration', 'Complex designing'],
    images: [
      '/projects/islamicCollege/1.jpg',
      '/projects/islamicCollege/2.jpg',
      '/projects/islamicCollege/3.jpg',
      '/projects/islamicCollege/4.jpg',
      '/projects/islamicCollege/5.jpg',
      '/projects/islamicCollege/6.jpg'
    ],
    vuejs: true,
    javascript: true,
    nuxt: true,
    illustration: false,
    github: true,
    tailwind: true,
    python: true,
    type: 'E-Learning',
    status: 'On stage',
    duration: '25 Days',
    link: 'https://stage-islamic.alnafi.com/',
  },
  {
    name: 'Rechik',
    logo: '/projects/rechik/Logo-Dark.png',
    description: ' More than just a clothing brand, we stand for fairness, inclusivity, and value. Every piece we create reflects our dedication to providing fashion that embodies sophistication without compromise.',
    achievements: ['E-Commerce', 'Microservice Architecture', 'Solo Development'],
    images: [
      '/projects/rechik/1.jpg',
      '/projects/rechik/2.jpg',
      '/projects/rechik/3.jpg',
      '/projects/rechik/4.jpg'
    ],
    vuejs: true,
    javascript: true,
    nuxt: true,
    netlify: true,
    illustration: true,
    github: true,
    tailwind: true,
    python: true,
    type: 'E-Commerce',
    status: 'Completed',
    duration: '20 Days',
    link: 'https://rechik.pk/',
  }
]
</script>

<style scoped>
.smooth-scroll {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>