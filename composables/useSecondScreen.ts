/**
 * Composable for managing second screen session and scroll synchronization
 * Handles throttling, event cleanup, and connection state
 */

import { ref, onBeforeUnmount } from 'vue'
import type { Socket } from 'socket.io-client'

// Throttle function for single-argument callbacks
function throttleWithArg<T>(func: (arg: T) => void, limit: number) {
  let inThrottle: boolean
  return function (this: unknown, arg: T) {
    if (!inThrottle) {
      func(arg)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  } as (arg: T) => void
}
export const useSecondScreen = () => {
  const { $socket } = useNuxtApp()
  const socket = $socket as Socket // Type assertion for Socket instance

  const sessionId = ref<string>('')
  const isConnected = ref(false)
  const participantCount = ref(0)
  const isScrolling = ref(false)

  /**
   * Generate a unique session ID using crypto API
   * Only works on client side (enforced via composable context)
   */
  const generateSessionId = (): string => {
    if (import.meta.server) return ''
    // Use crypto.randomUUID() for reliable unique IDs
    const id = crypto.randomUUID()
    sessionId.value = id
    return id
  }

  /**
   * Join a specific session room
   * Emits 'join-session' event to server
   */
  const joinSession = (id: string) => {
    sessionId.value = id
    socket.emit('join-session', { sessionId: id })
  }

  /**
   * Leave the current session
   * Cleans up socket listeners
   */
  const leaveSession = () => {
    if (sessionId.value) {
      socket.emit('leave-session', { sessionId: sessionId.value })
      sessionId.value = ''
    }
  }

  /**
   * Emit scroll position to other connected clients
   * Throttled to 30ms intervals for performance
   */
  const emitScrollPosition = throttleWithArg((scrollY: number) => {
    if (sessionId.value) {
      socket.emit('scroll-position', {
        sessionId: sessionId.value,
        position: scrollY,
      })
    }
  }, 30)

  /**
   * Handle incoming scroll position updates
   * Syncs to window.scrollTo() on desktop viewer
   */
  const onScrollPosition = (callback: (position: number) => void) => {
    socket.on('scroll-position', (data: { position: number }) => {
      callback(data.position)
    })
  }

  /**
   * Listen for connection status updates
   */
  const onSessionStatus = (callback: (data: Record<string, unknown>) => void) => {
    socket.on('session-status', callback)
  }

  /**
   * Attach scroll listener to window
   * Auto-cleanup on component unmount
   */
  const attachScrollListener = (onScroll: (scrollY: number) => void) => {
    const handleScroll = throttleWithArg(() => {
      onScroll(window.scrollY)
    }, 30)

    window.addEventListener('scroll', handleScroll as unknown as EventListener, { passive: true })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll as unknown as EventListener)
    })
  }

  /**
   * Attach touch/scroll listener for mobile devices
   * Handles both wheel and touch events
   */
  const attachMobileListener = (onScroll: (scrollY: number) => void) => {
    const handleScroll = throttleWithArg(() => {
      onScroll(window.scrollY)
    }, 30)

    // Handle wheel events (mouse scroll)
    window.addEventListener('wheel', handleScroll as unknown as EventListener, { passive: true })

    // Handle touch events (mobile scroll)
    window.addEventListener('scroll', handleScroll as unknown as EventListener, { passive: true })

    onBeforeUnmount(() => {
      window.removeEventListener('wheel', handleScroll as unknown as EventListener)
      window.removeEventListener('scroll', handleScroll as unknown as EventListener)
    })
  }

  /**
   * Listen to connection status from server
   */
  const watchConnectionStatus = () => {
    socket.on('connect', () => {
      isConnected.value = true
    })

    socket.on('disconnect', () => {
      isConnected.value = false
      participantCount.value = 0
    })

    socket.on('participant-count', (count: number) => {
      participantCount.value = count
    })
  }

  // Cleanup on component unmount
  onBeforeUnmount(() => {
    leaveSession()
  })

  return {
    sessionId,
    isConnected,
    participantCount,
    isScrolling,
    generateSessionId,
    joinSession,
    leaveSession,
    emitScrollPosition,
    onScrollPosition,
    onSessionStatus,
    attachScrollListener,
    attachMobileListener,
    watchConnectionStatus,
  }
}
