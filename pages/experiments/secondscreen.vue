<!-- Desktop viewer page - generates session and receives scroll control from mobile -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
    <!-- Connection Status Bar -->
    <ClientOnly>
      <div
        class="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-colors duration-300"
        :class="isConnected ? 'bg-green-900/30 border-b border-green-500/30' : 'bg-red-900/30 border-b border-red-500/30'"
      >
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-3 h-3 rounded-full animate-pulse"
              :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
            />
            <span class="text-sm font-medium">
              {{ isConnected ? 'Connected' : 'Disconnected' }}
            </span>
            <span v-if="isConnected && participantCount > 0" class="text-sm text-gray-300">
              • {{ participantCount }} controller{{ participantCount !== 1 ? 's' : '' }}
            </span>
          </div>
          <div v-if="!sessionShown" class="text-sm">
            <button
              class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors text-xs font-medium"
              @click="sessionShown = true"
            >
              Show QR Code
            </button>
          </div>
        </div>
      </div>

      <!-- QR Code Modal -->
      <Transition name="fade">
        <div v-if="sessionShown" class="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
          <div class="bg-gray-900 rounded-lg p-8 max-w-md w-full border border-gray-700 shadow-2xl">
            <h2 class="text-2xl font-bold mb-4 text-center">Control This Page</h2>
            <p class="text-gray-300 text-sm text-center mb-6">
              Scan this QR code with your phone to control the scroll position of this page.
            </p>

            <!-- QR Code Container -->
            <div class="bg-white rounded-lg p-4 mb-6 flex justify-center">
              <div ref="qrContainer" class="w-64 h-64" />
            </div>

            <!-- Session ID Display -->
            <div class="bg-gray-800 rounded-lg p-4 mb-6">
              <p class="text-gray-400 text-xs mb-2">Session ID</p>
              <p class="font-mono text-sm break-all text-white">{{ sessionId }}</p>
            </div>

            <!-- URL for manual entry -->
            <div class="bg-gray-800 rounded-lg p-4 mb-6">
              <p class="text-gray-400 text-xs mb-2">Or open this link on mobile</p>
              <a
                :href="controllerUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 hover:text-blue-300 text-sm break-all underline"
              >
                {{ controllerUrl }}
              </a>
            </div>

            <!-- Close Button -->
            <button
              class="w-full px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium"
              @click="sessionShown = false"
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </ClientOnly>

    <!-- Demo Content - Tall page to test scrolling -->
    <div class="pt-20">
      <!-- Hero Section -->
      <section class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl" />
          <div class="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl" />
          <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div class="relative z-10 max-w-2xl mx-auto text-center">
          <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SecondScreen Demo
          </h1>
          <p class="text-xl text-gray-300 mb-8">
            Scroll this page using your mobile device as a controller. The scroll position syncs in real-time via WebSockets.
          </p>
          <div class="inline-block">
            <button
              class="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
              @click="sessionShown = true"
            >
              📱 Show QR Code
            </button>
          </div>
        </div>
      </section>

      <!-- Feature Section 1 -->
      <section class="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-800/20">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold mb-6">Real-Time Synchronization</h2>
          <p class="text-lg text-gray-300 mb-6">
            This demo showcases WebSocket-based real-time communication between a desktop viewer and mobile controller.
          </p>
          <div class="space-y-4 text-gray-300">
            <div class="flex gap-4">
              <div class="text-2xl">🔌</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Socket.IO</h3>
                <p>Reliable real-time bidirectional communication</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="text-2xl">📱</div>
              <div>
                <h3 class="font-semibold text-white mb-2">QR Code Pairing</h3>
                <p>Scan to instantly join a session with unique ID</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="text-2xl">⚡</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Throttled Events</h3>
                <p>Scroll events are throttled for optimal performance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Section 2 -->
      <section class="min-h-screen flex flex-col items-center justify-center px-4">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold mb-6">Session Management</h2>
          <p class="text-lg text-gray-300 mb-6">
            Each session has a unique ID. Multiple devices can connect to the same session and control the scroll position simultaneously.
          </p>
          <div class="space-y-4 text-gray-300">
            <div class="flex gap-4">
              <div class="text-2xl">🔐</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Unique Session IDs</h3>
                <p>Generated using crypto.randomUUID() for reliability</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="text-2xl">👥</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Multiple Controllers</h3>
                <p>See how many devices are controlling this page</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="text-2xl">🧹</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Clean Disconnection</h3>
                <p>Graceful cleanup when controllers leave</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature Section 3 -->
      <section class="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-800/20">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold mb-6">Nuxt 3 Best Practices</h2>
          <p class="text-lg text-gray-300 mb-6">
            This implementation follows Nuxt 3 best practices and avoids common pitfalls.
          </p>
          <div class="space-y-4 text-gray-300">
            <div class="flex gap-4">
              <div class="text-2xl">🚫</div>
              <div>
                <h3 class="font-semibold text-white mb-2">No SSR on Client APIs</h3>
                <p>Socket.IO and window access only on client via plugin</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="text-2xl">🎯</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Composition API</h3>
                <p>Modern Vue 3 composables for logic reuse</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="text-2xl">♻️</div>
              <div>
                <h3 class="font-semibold text-white mb-2">Auto Cleanup</h3>
                <p>Event listeners cleaned up automatically on unmount</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <section class="py-20 px-4 text-center border-t border-gray-800">
        <h3 class="text-2xl font-bold mb-4">Ready to try?</h3>
        <p class="text-gray-400 mb-6">
          Make sure the Socket.IO server is running and open this page in another window or device.
        </p>
        <button
          class="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
          @click="sessionShown = true"
        >
          📱 Show QR Code
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, computed, onMounted, watch } from 'vue'
import { useSecondScreen } from '~/composables/useSecondScreen'
import type { Socket } from 'socket.io-client'

const { sessionId, isConnected, participantCount, generateSessionId, joinSession, onScrollPosition, watchConnectionStatus, onConnected } =
  useSecondScreen()

const sessionShown = ref(false)
const qrContainer = ref<HTMLDivElement>()

// Build the controller URL with session ID
const controllerUrl = computed(() => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  return `${baseUrl}/controller/${sessionId.value}`
})

// Initialize session and QR code on mount
onMounted(async () => {
  // Generate unique session ID
  generateSessionId()
  // Join the session room as viewer after socket connects
  onConnected(() => joinSession(sessionId.value))

  // Watch connection status
  watchConnectionStatus()

  // Setup QR code when session is shown
  watch(
    sessionShown,
    async (isShown) => {
      if (isShown && qrContainer.value && sessionId.value) {
        try {
          qrContainer.value.innerHTML = ''
          const QRCodeLib = QRCode as typeof QRCode & { toCanvas: typeof QRCode.toCanvas }
          await QRCodeLib.toCanvas(
            qrContainer.value,
            controllerUrl.value,
            {
              width: 256,
              margin: 2,
              color: {
                dark: '#000000',
                light: '#ffffff',
              },
            }
          )
        } catch (err) {
          console.error('Failed to generate QR code:', err)
        }
      }
    },
    { immediate: false }
  )

  // Listen for incoming scroll commands from mobile controller
  onScrollPosition((position: number) => {
    if (typeof window !== 'undefined') {
      console.log('[viewer] applying scroll-position', position)
      window.scrollTo({ top: position, behavior: 'auto' })
    }
  })
})

// Graceful fallback message (shown when JavaScript is disabled or SSR issue)
definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
