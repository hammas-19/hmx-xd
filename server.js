/**
 * Standalone Socket.IO Server for SecondScreen Demo
 * Run separately from Nuxt app: node server.js
 * Handles session management and real-time scroll synchronization
 */

import { createServer } from 'http'
import { Server } from 'socket.io'

// Create HTTP server
const httpServer = createServer()

// Initialize Socket.IO server with CORS enabled
const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      // Add your Netlify domain here when deploying
      // Example: 'https://your-site.netlify.app'
      process.env.CLIENT_URL || '',
    ].filter(Boolean),
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})

// Store active sessions and their participants
const sessions = new Map()

/**
 * Get or create a session
 */
const getOrCreateSession = (sessionId) => {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      viewers: new Set(),
      controllers: new Set(),
      lastScrollPosition: 0,
    })
  }
  return sessions.get(sessionId)
}

/**
 * Get participant count for a session
 */
const getParticipantCount = (sessionId) => {
  const session = sessions.get(sessionId)
  if (!session) return 0
  return session.controllers.size + session.viewers.size
}

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`)

  /**
   * Client joins a session
   * Can be either a viewer (desktop) or controller (mobile)
   */
  socket.on('join-session', (data) => {
    const { sessionId } = data
    if (!sessionId) {
      socket.emit('error', { message: 'Invalid session ID' })
      return
    }

    // Get or create session
    const session = getOrCreateSession(sessionId)

    // Join the Socket.IO room for this session
    socket.join(`session-${sessionId}`)

    // Store client role based on user agent or explicit flag
    const userAgent = socket.handshake.headers['user-agent'] || ''
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
    const role = isMobile ? 'controller' : 'viewer'

    // Store socket ID in session
    if (role === 'controller') {
      session.controllers.add(socket.id)
    } else {
      session.viewers.add(socket.id)
    }

    // Store session info on socket for cleanup
    socket.data.sessionId = sessionId
    socket.data.role = role

    console.log(
      `Client ${socket.id} joined session ${sessionId} as ${role}. Total participants: ${getParticipantCount(sessionId)}`
    )

    // Notify all clients in session about participant count
    io.to(`session-${sessionId}`).emit('participant-count', getParticipantCount(sessionId))

    // Send current scroll position to newly joined client
    socket.emit('scroll-position', { position: session.lastScrollPosition })

    // Broadcast session status
    io.to(`session-${sessionId}`).emit('session-status', {
      sessionId,
      participantCount: getParticipantCount(sessionId),
      controllers: session.controllers.size,
      viewers: session.viewers.size,
    })
  })

  /**
   * Handle scroll position updates from controller
   * Broadcast to all viewers in the same session
   */
  socket.on('scroll-position', (data) => {
    const { sessionId, position } = data

    if (!sessionId) return

    const session = sessions.get(sessionId)
    if (!session) return

    // Update session's last scroll position
    session.lastScrollPosition = position

    // Broadcast to all clients in session (throttled by client)
    io.to(`session-${sessionId}`).emit('scroll-position', {
      position,
      from: socket.id,
    })

    // Optional: Log for debugging
    // console.log(`Scroll update in ${sessionId}: ${position}px from ${socket.id}`)
  })

  /**
   * Client leaves session
   */
  socket.on('leave-session', (data) => {
    const { sessionId } = data || { sessionId: socket.data.sessionId }

    if (!sessionId) return

    const session = sessions.get(sessionId)
    if (!session) return

    // Remove from role sets
    if (socket.data.role === 'controller') {
      session.controllers.delete(socket.id)
    } else {
      session.viewers.delete(socket.id)
    }

    // Leave socket room
    socket.leave(`session-${sessionId}`)

    const remainingParticipants = getParticipantCount(sessionId)
    console.log(
      `Client ${socket.id} left session ${sessionId}. Remaining participants: ${remainingParticipants}`
    )

    if (remainingParticipants > 0) {
      // Update remaining clients
      io.to(`session-${sessionId}`).emit('participant-count', remainingParticipants)
      io.to(`session-${sessionId}`).emit('session-status', {
        sessionId,
        participantCount: remainingParticipants,
        controllers: session.controllers.size,
        viewers: session.viewers.size,
      })
    } else {
      // Clean up empty session
      sessions.delete(sessionId)
      console.log(`Session ${sessionId} removed (no participants)`)
    }
  })

  /**
   * Handle client disconnect
   */
  socket.on('disconnect', () => {
    const { sessionId, role } = socket.data

    if (sessionId) {
      const session = sessions.get(sessionId)
      if (session) {
        // Remove from role sets
        if (role === 'controller') {
          session.controllers.delete(socket.id)
        } else {
          session.viewers.delete(socket.id)
        }

        const remainingParticipants = getParticipantCount(sessionId)
        console.log(
          `Client ${socket.id} disconnected from session ${sessionId}. Remaining: ${remainingParticipants}`
        )

        if (remainingParticipants > 0) {
          // Update remaining clients
          io.to(`session-${sessionId}`).emit('participant-count', remainingParticipants)
        } else {
          // Clean up empty session
          sessions.delete(sessionId)
          console.log(`Session ${sessionId} removed (no participants)`)
        }
      }
    }

    console.log(`Client disconnected: ${socket.id}`)
  })

  /**
   * Error handling
   */
  socket.on('error', (error) => {
    console.error(`Socket error for ${socket.id}:`, error)
  })
})

// Server startup
const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`🚀 SecondScreen Socket.IO server running on port ${PORT}`)
  console.log(`   Make sure Nuxt app is running on http://localhost:3000`)
  console.log(`   Visit http://localhost:3000/experiments/secondscreen to test`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...')
  httpServer.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('\nSIGINT received, closing server...')
  httpServer.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
