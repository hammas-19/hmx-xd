/**
 * Socket.IO client plugin for Nuxt 3
 * Runs only on the client side using clientOnly execution
 * Provides singleton Socket instance across the app
 */

import { io, Socket } from 'socket.io-client'

declare global {
  interface NuxtApp {
    $socket: Socket
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Only initialize socket on client side
  if (process.server) return

  // Connect to Socket.IO server
  // Update this URL to match your server's address
  const socket = io(process.env.NUXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  // Global error handling
  socket.on('connect_error', (error: any) => {
    console.error('Socket connection error:', error)
  })

  socket.on('disconnect', (reason: string) => {
    console.log('Socket disconnected:', reason)
  })

  socket.on('connect', () => {
    console.log('Socket connected')
  })

  // Provide socket instance throughout the app
  return {
    provide: {
      socket,
    },
  }
})
