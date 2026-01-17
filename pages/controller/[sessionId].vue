<!-- Mobile controller page - controls the scroll position of the desktop viewer -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
    <!-- Connection Status Header -->
    <ClientOnly>
      <div
        class="sticky top-0 z-50 px-4 py-3 transition-colors duration-300 border-b"
        :class="isConnected ? 'bg-green-900/30 border-green-500/30' : 'bg-red-900/30 border-red-500/30'"
      >
        <div class="flex items-center justify-between max-w-4xl mx-auto">
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 rounded-full animate-pulse"
              :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
            />
            <span class="text-sm font-medium">
              {{ isConnected ? 'Connected to Session' : 'Disconnecting...' }}
            </span>
          </div>
          <button
            class="text-xs px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors font-medium"
            @click="handleLeaveSession"
          >
            Leave
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="sessionError" class="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
        <div class="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md w-full">
          <h2 class="text-xl font-bold mb-4">Connection Error</h2>
          <p class="text-red-100 mb-6">{{ sessionError }}</p>
          <NuxtLink
            to="/"
            class="w-full block text-center px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors font-medium"
          >
            Go Home
          </NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="!sessionError" class="flex-1 flex flex-col items-center justify-center px-4">
        <div class="max-w-sm w-full">
          <!-- Title -->
          <h1 class="text-3xl font-bold text-center mb-2">Scroll Controller</h1>
          <p class="text-gray-400 text-center text-sm mb-8">
            Session: <span class="font-mono text-blue-300">{{ sessionId }}</span>
          </p>

          <!-- Instructions -->
          <div class="bg-slate-700/50 rounded-lg p-6 mb-8 border border-slate-600">
            <h2 class="text-lg font-semibold mb-4">Instructions</h2>
            <ol class="space-y-3 text-sm text-gray-300">
              <li class="flex gap-3">
                <span class="font-bold text-blue-400">1</span>
                <span>Scroll up or down on this page</span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-blue-400">2</span>
                <span>Watch the desktop page scroll in real-time</span>
              </li>
              <li class="flex gap-3">
                <span class="font-bold text-blue-400">3</span>
                <span>Multiple controllers can connect to the same session</span>
              </li>
            </ol>
          </div>

          <!-- Scroll Position Display -->
          <div class="bg-slate-700/50 rounded-lg p-6 border border-slate-600 mb-8">
            <p class="text-gray-400 text-sm mb-2">Current Scroll Position</p>
            <div class="text-5xl font-bold font-mono text-blue-400">{{ Math.round(currentScrollPosition) }}</div>
            <p class="text-gray-500 text-xs mt-2">pixels from top</p>
          </div>

          <!-- Scroll Simulator -->
          <div class="bg-slate-700/50 rounded-lg p-6 border border-slate-600">
            <p class="text-gray-400 text-sm mb-4">Or use manual control</p>
            <div class="space-y-3">
              <button
                class="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
                @click="quickScroll(-500)"
              >
                ⬆️ Scroll Up (500px)
              </button>
              <button
                class="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
                @click="quickScroll(500)"
              >
                ⬇️ Scroll Down (500px)
              </button>
              <button
                class="w-full px-4 py-3 rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors font-semibold text-sm"
                @click="scrollToTop"
              >
                To Top
              </button>
            </div>
          </div>

          <!-- Status Info -->
          <div class="mt-8 p-4 rounded-lg bg-slate-800/50 border border-slate-600">
            <p class="text-xs text-gray-400 text-center">
              This page acts as a controller. Open the desktop page to see it scroll.
            </p>
          </div>

          <!-- Infinite Scroll Pad -->
          <div class="mt-8 p-4 rounded-lg bg-slate-800/50 border border-slate-600">
            <p class="text-sm text-gray-300 mb-4 font-semibold">Scroll Pad</p>
            <p class="text-xs text-gray-400 mb-3">Scroll this area to drive the desktop page. It is intentionally tall.</p>
            <div class="relative rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden h-[300vh]">
              <div class="sticky top-0 left-0 right-0 flex items-center justify-between px-4 py-2 text-[11px] text-gray-400 bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/60">
                <span>Scroll down to send updates</span>
                <span class="font-mono text-blue-300">{{ Math.round(currentScrollPosition) }} px</span>
              </div>
              <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.04),transparent_35%),radial-gradient(circle_at_20%_60%,rgba(59,130,246,0.07),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.06),transparent_35%)]" />
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSecondScreen } from '~/composables/useSecondScreen'
import type { Socket } from 'socket.io-client'

const route = useRoute()
const router = useRouter()

const { $socket } = useNuxtApp()

const { sessionId, isConnected, joinSession, leaveSession, attachMobileListener, emitScrollPosition, watchConnectionStatus, onConnected } =
  useSecondScreen()

const currentScrollPosition = ref(0)
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
  if (typeof window !== 'undefined') {
    window.scrollBy({ top: amount, behavior: 'smooth' })
  }
}

/**
 * Scroll to top
 */
const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
onMounted(() => {
  // Validate session ID from route
  if (!pageSessionId.value) {
    sessionError.value = 'Invalid session ID. Please scan a valid QR code.'
    return
  }

  // Join the session after socket connects
  onConnected(() => joinSession(pageSessionId.value))

  // Watch connection status
  watchConnectionStatus()

  // Attach mobile scroll listener to emit position to desktop viewers
  attachMobileListener((scrollY: number) => {
    currentScrollPosition.value = scrollY
    // Emit scroll position directly to session
    const socket = $socket as Socket
    if (socket && pageSessionId.value) {
      console.log('[controller] emit scroll-position', { sessionId: pageSessionId.value, scrollY })
      socket.emit('scroll-position', {
        sessionId: pageSessionId.value,
        position: scrollY,
      })
    }
  })

  // Listen to any messages from the server
  const socket = $socket as Socket // Type assertion for Socket instance
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
  leaveSession()
})
</script>
