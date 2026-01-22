<!-- Mobile controller page - controls the scroll position of the desktop viewer -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b0b0f] via-boss to-[#0b0b0f] text-white flex flex-col">
    <!-- Connection Status Header -->
    <ClientOnly>
      <!-- Logo - Fixed Top Left -->
      <div class="fixed top-4 left-4 z-50">
        <img src="/home/signLogo.png" class="w-[43px] h-fit px-2 py-[3px]" alt="Hammas Masood">
      </div>

      <!-- Connection Status Badge & Leave Button - Fixed Top Right -->
      <div class="fixed top-4 right-4 z-50 flex items-center gap-3">
        <div
          class="flex items-center gap-2.5 px-4 py-2 rounded-2xl backdrop-blur-xl border transition-all duration-300"
          :class="isConnected ? 'bg-bubbles/10 border-bubbles/30' : 'bg-red-500/10 border-red-500/30'"
        >
          <div class="relative">
            <div
              class="w-2 h-2 rounded-full animate-pulse"
              :class="isConnected ? 'bg-bubbles' : 'bg-red-400'"
            />
            <div
              class="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-75"
              :class="isConnected ? 'bg-bubbles' : 'bg-red-400'"
            />
          </div>
          <span class="text-xs font-semibold font-doto tracking-wide" :class="isConnected ? 'text-bubbles' : 'text-red-400'">
            {{ isConnected ? 'LIVE' : 'CONNECTING' }}
          </span>
        </div>
        <button
          class="px-4 py-2 rounded-2xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 transition-all text-xs font-semibold text-red-400"
          @click="handleLeaveSession"
        >
          Leave
        </button>
      </div>

      <!-- Error State -->
      <div v-if="sessionError" class="fixed inset-0 z-40 bg-boss/70 backdrop-blur-md flex items-center justify-center p-4">
        <div class="relative w-full max-w-md">
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 via-red-500/5 to-transparent blur-3xl pointer-events-none" />
          <div class="relative bg-[#0b0b0f]/90 border border-red-500/30 rounded-3xl p-8 ">
            <h2 class="text-2xl font-bold font-doto mb-4 text-red-400">Connection Error</h2>
            <p class="text-white/80 mb-6 leading-relaxed">{{ sessionError }}</p>
            <NuxtLink
              to="/"
              class="w-full block text-center px-4 py-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 transition-all font-semibold"
            >
              Go Home
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="!sessionError" class="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div class="max-w-lg w-full space-y-6">
          <!-- Title -->
          <div class="text-center space-y-2">
            <p class="text-xs uppercase tracking-[0.2em] text-bubbles font-doto">Second Screen Controller</p>
            <h1 class="text-4xl font-black font-doto text-white">Remote Control</h1>
            <p class="text-white/50 text-sm">
              Session: <span class="font-mono text-bubbles">{{ sessionId }}</span>
            </p>
          </div>

          <!-- To Top Button -->
          <button
            class="w-full px-6 py-4 rounded-2xl bg-bubbles/10 hover:bg-bubbles/20 border border-bubbles/30 hover:border-bubbles/50 transition-all font-semibold text-bubbles hover:shadow-[0_0_35px_rgba(195,252,177,0.25)] flex items-center justify-center gap-3"
            @click="scrollToTop"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Scroll to Top
          </button>

          <!-- Virtual Scroll Pad (infinite control) -->
          <div class="relative w-full">
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-bubbles/10 via-bubbles/5 to-transparent blur-3xl pointer-events-none" />
            <div class="relative bg-[#0b0b0f]/80 border border-white/10 rounded-3xl overflow-hidden">
              <div class="h-1 w-full bg-gradient-to-r from-boss via-bubbles to-boss" />
              
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-xs uppercase tracking-[0.2em] text-bubbles/70 mb-1 font-doto">Control Pad</p>
                    <h2 class="text-lg font-bold text-white">Scroll or Drag</h2>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-white/50 mb-1">Position</p>
                    <p class="text-2xl font-mono font-bold text-bubbles">{{ Math.round(currentScrollPosition) }}</p>
                  </div>
                </div>

                <div
                  ref="padRef"
                  class="relative rounded-2xl border border-white/10 bg-gradient-to-b from-boss/50 to-boss/80 h-[50vh] min-h-[400px] select-none cursor-grab active:cursor-grabbing overflow-hidden"
                  tabindex="0"
                  style="touch-action: none; overscroll-behavior: contain;"
                >
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(195,252,177,0.08),transparent_40%),radial-gradient(circle_at_20%_60%,rgba(195,252,177,0.05),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(195,252,177,0.06),transparent_40%)]" />
                  
                  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="text-center space-y-3">
                      <div class="inline-flex p-4 rounded-full bg-bubbles/10 border border-bubbles/30">
                        <svg class="w-8 h-8 text-bubbles" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </div>
                      <p class="text-sm font-semibold text-white/70">Scroll or drag here</p>
                      <p class="text-xs text-white/50">Controls the desktop page in real-time</p>
                    </div>
                  </div>

                  <div class="absolute bottom-4 left-4 right-4 px-4 py-2 text-xs text-white/50 bg-boss/60 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-between">
                    <span>Touch & Wheel Enabled</span>
                    <span class="font-mono text-bubbles">{{ Math.round(currentScrollPosition) }}px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSecondScreen } from '~/composables/useSecondScreen'
import type { Socket } from 'socket.io-client'

const route = useRoute()
const router = useRouter()

const { $socket } = useNuxtApp()

const { sessionId, isConnected, joinSession, leaveSession, watchConnectionStatus, onConnected } =
  useSecondScreen()

const currentScrollPosition = ref(0)
const controllerPosition = ref(0)
const padRef = ref<HTMLDivElement | null>(null)
const socket = $socket as Socket

const MAX_SCROLL_POSITION = 5000
const clampPosition = (pos: number) => Math.max(0, Math.min(pos, MAX_SCROLL_POSITION))

// Virtual scroll helpers
let rafPending = false
let touchStartY = 0
let onWheel: (e: WheelEvent) => void
let onTouchStart: (e: TouchEvent) => void
let onTouchMove: (e: TouchEvent) => void

const emitPosition = () => {
  currentScrollPosition.value = controllerPosition.value
  if (socket && pageSessionId.value) {
    socket.emit('scroll-position', {
      sessionId: pageSessionId.value,
      position: Math.max(0, controllerPosition.value),
    })
  }
}

const scheduleEmit = () => {
  if (rafPending) return
  rafPending = true
  requestAnimationFrame(() => {
    rafPending = false
    emitPosition()
  })
}
const sessionError = ref<string>('')

// Extract session ID from route parameter
const pageSessionId = computed(() => {
  const id = route.params.sessionId as string | string[]
  return typeof id === 'string' ? id : id[0] || ''
})

/**
 * Quick scroll helper for manual controls
 * Emits scroll position to all connected viewers
 */
const quickScroll = (amount: number) => {
  controllerPosition.value = clampPosition(controllerPosition.value + amount)
  currentScrollPosition.value = controllerPosition.value
  const socket = $socket as Socket
  if (socket && pageSessionId.value) {
    socket.emit('scroll-position', {
      sessionId: pageSessionId.value,
      position: controllerPosition.value,
    })
  }
}

/**
 * Scroll to top
 */
const scrollToTop = () => {
  controllerPosition.value = 0
  currentScrollPosition.value = 0
  const socket = $socket as Socket
  if (socket && pageSessionId.value) {
    socket.emit('scroll-position', {
      sessionId: pageSessionId.value,
      position: 0,
    })
  }
}

/**
 * Leave the session and return to home
 */
const handleLeaveSession = () => {
  leaveSession()
  router.push('/')
}

// Setup on mount
onMounted(async () => {
  // Validate session ID from route
  if (!pageSessionId.value) {
    sessionError.value = 'Invalid session ID. Please scan a valid QR code.'
    return
  }

  // Join the session after socket connects
  onConnected(() => joinSession(pageSessionId.value))

  // Watch connection status
  watchConnectionStatus()

  // Virtual scroll handlers on the pad
  onWheel = (e: WheelEvent) => {
    e.preventDefault()
    controllerPosition.value = clampPosition(controllerPosition.value + e.deltaY)
    scheduleEmit()
  }
  onTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY
  }
  onTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    const dy = touchStartY - e.touches[0].clientY
    controllerPosition.value = clampPosition(controllerPosition.value + dy)
    touchStartY = e.touches[0].clientY
    scheduleEmit()
  }

  await nextTick()
  if (padRef.value) {
    padRef.value.addEventListener('wheel', onWheel, { passive: false })
    padRef.value.addEventListener('touchstart', onTouchStart, { passive: true })
    padRef.value.addEventListener('touchmove', onTouchMove, { passive: false })
    console.log('[controller] pad listeners attached')
  } else {
    console.warn('[controller] padRef not ready; retrying attach')
    setTimeout(() => {
      if (padRef.value) {
        padRef.value.addEventListener('wheel', onWheel, { passive: false })
        padRef.value.addEventListener('touchstart', onTouchStart, { passive: true })
        padRef.value.addEventListener('touchmove', onTouchMove, { passive: false })
        console.log('[controller] pad listeners attached (retry)')
      }
    }, 50)
  }

  // Listen to any messages from the server
  socket.on('error', (error: { message: string }) => {
    console.error('Session error:', error)
    sessionError.value = 'Failed to join session: ' + error.message
  })

  // Handle scroll command from viewers (if needed for feedback)
  socket.on('scroll-command', (data: { position: number }) => {
    console.log('[controller] scroll-command received', data)
    currentScrollPosition.value = data.position
  })
})

onUnmounted(() => {
  // Cleanup listeners
  if (padRef.value) {
    padRef.value.removeEventListener('wheel', onWheel as EventListener)
    padRef.value.removeEventListener('touchstart', onTouchStart as EventListener)
    padRef.value.removeEventListener('touchmove', onTouchMove as EventListener)
  }
  leaveSession()
})
</script>
