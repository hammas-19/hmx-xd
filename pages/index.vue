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
      <template v-if="isDesktopViewport">
      <!-- Connection Badge & Toggle Button -->
      <div class="fixed md:top-4 top-20 right-4 z-50 flex flex-col gap-3 items-end">
        <!-- Connection Status Badge -->
        <div class="flex flex-col items-center gap-[2px]">
          <div class="loader" :class="{ 'connected': isConnected }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z">
              </path>
            </svg>
            <span></span>
          </div>
          <p class="text-xs font-doto !text-[#000000]">
            {{ isConnected ? 'Connected' : 'Connecting' }}
          </p>
        </div>

        <!-- Toggle QR Modal Button (Only show when modal is NOT open) -->
        <button
          v-if="!sessionShown"
          data-pointer="open"
          @click="sessionShown = true"
          class="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-boss/80 backdrop-blur-xl border border-white/10 hover:border-bubbles/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(195,252,177,0.3)]"
        >
          <svg class="w-5 h-5 text-white group-hover:text-bubbles transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Tooltip -->
          <span class="absolute right-full mr-3 px-3 py-1.5 bg-boss text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Open Controller
          </span>
        </button>
      </div>

      <!-- QR Modal Popup -->
      <Transition name="fade">
        <div v-if="sessionShown" class="fixed inset-0 z-40 bg-boss/40 backdrop-blur-md flex items-center justify-center p-4">
          <div class="relative w-full max-w-md">
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl pointer-events-none" />
            <div class="relative bg-[#0b0b0f] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
              <div class="h-1 w-full bg-gradient-to-r from-[#1a1a1a] via-[#c3fcb1] to-[#1a1a1a]" />

              <div class="p-8 space-y-6">
                <!-- Modal Header -->
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs uppercase tracking-[0.2em] text-bubbles mb-1">Control via Phone?</p>
                    <h2 class="text-2xl font-semibold text-white">Scan to Connect</h2>
                  </div>
                  <button
                    class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-white/40 transition"
                    data-pointer="close"
                    @click="sessionShown = false"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- QR Container -->
                <div v-if="!isConnected" class="flex justify-center">
                  <div ref="qrContainer" class="bg-white p-4 rounded-2xl shadow-inner shadow-black/20" />
                </div>
                
                <!-- Success Animation -->
                <div v-if="isConnected" class="success-animation">
                  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                
                <!-- Instructions -->
                <p class="text-sm text-white text-center leading-relaxed">
                  {{ isConnected ? 'Connected successfully! Closing...' : 'Pair your phone as a controller instantly, just scan the QR code. No setup needed.' }}
                </p>

                <!-- Actions -->
                <!-- <div class="space-y-3">
                  <a
                    :href="controllerUrl"
                    target="_blank"
                    rel="noopener"
                    class="w-full block text-center px-4 py-3 rounded-2xl bg-gradient-to-r from-[#2582F6] to-[#0f5ad4] hover:from-[#2f8dff] hover:to-[#1a5be8] transition-colors text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,130,246,0.3)]"
                  >
                    Open Controller
                  </a>

                  <button
                    class="w-full px-4 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors text-sm font-semibold text-white"
                    @click="sessionShown = false"
                  >
                    Close
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </Transition>
      </template>
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
const isDesktopViewport = ref(true)
const SESSION_MODAL_SEEN_KEY = 'viewer_qr_modal_seen'
const controllerUrl = computed(() => {
  if (!viewerSessionId.value) return ''
  if (import.meta.client) {
    return `${window.location.origin}/controller/${viewerSessionId.value}`
  }
  return `/controller/${viewerSessionId.value}`
})

const genId = () => Math.random().toString(36).slice(2, 10)

onMounted(() => {
  isDesktopViewport.value = import.meta.client ? window.innerWidth >= 768 : true

  // Create and join a session as the viewer when socket connects (desktop only)
  if (isDesktopViewport.value) {
    viewerSessionId.value = genId()
    onConnected(() => joinSession(viewerSessionId.value, 'viewer'))
    watchConnectionStatus()

    // Apply incoming scroll positions directly to the page
    onScrollPosition((pos: number) => {
      if (import.meta.client) {
        window.scrollTo({ top: Math.max(0, pos), behavior: 'auto' })
      }
    })
  }

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

  // Watch connection status and auto-close modal after 2 seconds on successful connection
  watch(isConnected, (connected) => {
    if (connected && sessionShown.value) {
      setTimeout(() => {
        sessionShown.value = false
      }, 2000)
    }
  })

  // Auto-show QR modal only once per browser session (desktop only)
  if (isDesktopViewport.value && import.meta.client) {
    const hasSeenModal = sessionStorage.getItem(SESSION_MODAL_SEEN_KEY) === '1'
    if (!hasSeenModal) {
      sessionShown.value = true
      sessionStorage.setItem(SESSION_MODAL_SEEN_KEY, '1')
    }
  }
})

onUnmounted(() => {
  leaveSession()
})

const projects = [
  {
    slug: 'art-agency',
    name: 'Art Agency',
    // logo: '/projects/codesHawk/logo.jpeg',
    description: '"WE CRAFT STRATEGIC, CREATIVE SOLUTIONS THAT COMBINE SMART IDEAS WITH STUNNING, FUNCTIONAL DESIGN. BY OBSESSING OVER THE DETAILS, WE INSPIRE ACTION AND DELIVER MEASURABLE RESULTS, EMPOWERING BRANDS TO THRIVE IN A DYNAMIC, EVER-EVOLVING MARKETPLACE."',
    achievements: ['Creative Design', 'Animations', 'Solo Development', 'Portfolio', 'GSAP Animations', 'Backend Integration'],
    images: [
      '/projects/dotAgency/1.png',
      '/projects/dotAgency/2.png',
      '/projects/dotAgency/3.png',
      '/projects/dotAgency/4.png',
      '/projects/dotAgency/5.png',
      '/projects/dotAgency/6.png'
    ],
    inProgress: true,
    javascript: true,
    netlify: true,
    lenis: true,
    github: true,
    nuxt: true,
    vuejs: true,
    gsap: true,
    framer: true,
    css: true,
    tailwind: true,
    type: 'Portfolio',
    status: 'On stage',
    duration: '---',
    link: 'https://artdotagency.netlify.app/',
  },
  {
    slug: 'mr-tech-labs',
    name: 'MR Tech Labs',
    logo: '/projects/mrTechLabs/techLabsLogo.webp',
    description: '"We provide rapid, highly effective strategies to dramatically increase your sales and build a highly recognized, desirable brand."',
    achievements: ['Creative Design', 'Animations', 'Solo Development', 'Portfolio'],
    images: [
      '/projects/mrTechLabs/1.png',
      '/projects/mrTechLabs/2.png',
      '/projects/mrTechLabs/3.png',
      '/projects/mrTechLabs/4.png',
      '/projects/mrTechLabs/5.png',
      '/projects/mrTechLabs/6.png'
    ],
    javascript: true,
    netlify: true,
    github: true,
    html: true,
    css: true,
    tailwind: true,
    type: 'Portfolio',
    status: 'Completed',
    duration: '5 Days',
    link: 'https://mrtechlabs.com/',
  },
  {
    slug: 'ranked-designs',
    name: 'Ranked Designs',
    logo: '/projects/rankedDesigns/logo.webp',
    description: '"Ranked Designs delivers top-quality services with a team of experts who know how to make your brand stand out. We use the best tools and strategies to create solutions that are affordable, effective, and tailored to your needs. From websites to marketing materials, we handle everything to save you time and effort."',
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
    slug: 'job-portal',
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
    status: 'Completed',
    duration: '45 Days',
    link: 'https://jobportal.alnafi.com/',
  },
  {
    slug: 'college',
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
    status: 'Completed',
    duration: '25 Days',
    link: 'https://islamic.alnafi.com/',
  },
  {
    slug: 'rechik',
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

/* comlpete animation */
/* .success-animation { margin:150px auto;} */

.checkmark {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #c3fcb1;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #c3fcb1;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    position:relative;
    top: 5px;
    right: 5px;
   margin: 0 auto;
}
.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #c3fcb1;
    fill: #ffffff00;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
 
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes scale {
    0%, 100% {
        transform: none;
    }

    50% {
        transform: scale3d(1.1, 1.1, 1);
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #c2fcb100;
    }
}

/* connecting state */
.loader {
    --color: #131313;
    --size: 40px;
    position: relative;
    width: var(--size);
    height: var(--size);
    transition: all 0.3s ease;
  }

  .loader span {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid var(--color);
    border-bottom: 1px solid transparent;
    border-radius: 100%;
    animation: keyframes-rotate .8s infinite linear;
    transition: opacity 0.3s ease;
  }

  .loader svg {
    width: 100%;
    height: 100%;
    padding: 25%;
    fill: var(--color);
    animation: keyframes-blink .8s infinite ease-in-out;
    transition: fill 0.3s ease;
  }

  /* Connected state - green and no animation */
  .loader.connected {
    --color: #c3fcb1;
    background-color: #000000;
    border-radius: 100%;
  }

  .loader.connected span {
    animation: none;
    opacity: 0;
  }

  .loader.connected svg {
    animation: none;
    opacity: 1;
    fill: #c3fcb1;
  }

  @keyframes keyframes-rotate {
    0% {
      transform: rotate(360deg);
    }
  }

  @keyframes keyframes-blink {
    50% {
      opacity: 0.8;
    }
  }
</style>