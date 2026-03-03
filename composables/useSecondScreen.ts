/**
 * Composable for managing second screen session and scroll synchronization
 * Handles throttling, event cleanup, and connection state
 */

import { ref, onBeforeUnmount } from 'vue'
import type { Socket } from 'socket.io-client'

type SessionRole = 'viewer' | 'controller'

// Throttle function for callbacks
function throttle(func: () => void, limit: number) {
  let inThrottle: boolean
  return function (this: unknown) {
    if (!inThrottle) {
      func()
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
export const useSecondScreen = () => {
  const { $socket } = useNuxtApp()
  const socket = $socket as Socket // Type assertion for Socket instance

  const sessionId = ref<string>('')
  const sessionRole = ref<SessionRole>('viewer')
  const isConnected = ref(false)
  const isSocketConnected = ref(false)
  const participantCount = ref(0)
  const controllers = ref(0)
  const viewers = ref(0)
  const isScrolling = ref(false)

  const updateSessionStatus = (data: {
    participantCount?: number
    controllers?: number
    viewers?: number
  }) => {
    controllers.value = Number(data.controllers ?? controllers.value ?? 0)
    viewers.value = Number(data.viewers ?? viewers.value ?? 0)
    const countFromRoles = controllers.value + viewers.value
    participantCount.value = Number(data.participantCount ?? countFromRoles ?? 0)
    isConnected.value = participantCount.value >= 2
  }

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
  const joinSession = (id: string, role: SessionRole = 'viewer') => {
    sessionId.value = id
    sessionRole.value = role
    socket.emit('join-session', { sessionId: id, role })
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
  const emitScrollPosition = (scrollY: number) => {
    if (sessionId.value) {
      socket.emit('scroll-position', {
        sessionId: sessionId.value,
        position: scrollY,
      })
    }
  }

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
   * Run callback once socket is connected
   */
  const onConnected = (cb: () => void) => {
    if (socket.connected) {
      cb()
    } else {
      socket.once('connect', cb)
    }
  }

  /**
   * Attach scroll listener to window
   * Auto-cleanup on component unmount
   */
  const attachScrollListener = (onScroll: (scrollY: number) => void) => {
    const handleScroll = () => {
      onScroll(window.scrollY)
    }

    const throttledScroll = throttle(handleScroll, 30)

    window.addEventListener('scroll', throttledScroll, { passive: true })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', throttledScroll)
    })
  }

  /**
   * Attach touch/scroll listener for mobile devices
   * Handles both wheel and touch events
   */
  const attachMobileListener = (onScroll: (scrollY: number) => void) => {
    const handleScroll = () => {
      onScroll(window.scrollY)
    }

    const throttledScroll = throttle(handleScroll, 30)

    // Handle wheel events (mouse scroll)
    window.addEventListener('wheel', throttledScroll, { passive: true })

    // Handle touch events (mobile scroll)
    window.addEventListener('scroll', throttledScroll, { passive: true })

    onBeforeUnmount(() => {
      window.removeEventListener('wheel', throttledScroll)
      window.removeEventListener('scroll', throttledScroll)
    })
  }

  const handleConnect = () => {
    isSocketConnected.value = true
    if (sessionId.value) {
      socket.emit('join-session', { sessionId: sessionId.value, role: sessionRole.value })
    }
  }

  const handleDisconnect = () => {
    isSocketConnected.value = false
    isConnected.value = false
    participantCount.value = 0
    controllers.value = 0
    viewers.value = 0
  }

  const handleParticipantCount = (count: number) => {
    participantCount.value = count
    isConnected.value = count >= 2
  }

  const handleSessionStatus = (data: { participantCount?: number; controllers?: number; viewers?: number }) => {
    updateSessionStatus(data)
  }

  /**
   * Listen to connection status from server
   */
  const watchConnectionStatus = () => {
    socket.off('connect', handleConnect)
    socket.off('disconnect', handleDisconnect)
    socket.off('participant-count', handleParticipantCount)
    socket.off('session-status', handleSessionStatus)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('participant-count', handleParticipantCount)
    socket.on('session-status', handleSessionStatus)
  }

  // Cleanup on component unmount
  onBeforeUnmount(() => {
    leaveSession()
  })

  return {
    sessionId,
    isConnected,
    isSocketConnected,
    participantCount,
    controllers,
    viewers,
    isScrolling,
    generateSessionId,
    joinSession,
    leaveSession,
    emitScrollPosition,
    onScrollPosition,
    onSessionStatus,
    onConnected,
    attachScrollListener,
    attachMobileListener,
    watchConnectionStatus,
  }
}
