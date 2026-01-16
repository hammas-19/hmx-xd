# SecondScreen Interaction Demo

A production-ready demonstration of real-time WebSocket communication in Nuxt 3, where a mobile device controls the scroll position of a desktop page.

## 🎯 Features

- **Real-Time Synchronization**: Instant scroll position sync via Socket.IO WebSockets
- **QR Code Pairing**: Scan QR code on mobile to instantly join a session
- **Session Management**: Unique session IDs with crypto.randomUUID()
- **Throttled Events**: Optimized scroll events (30ms throttle) for performance
- **Connection Status**: Real-time connection indicators and participant counts
- **Nuxt 3 Best Practices**: Composition API, ClientOnly components, proper SSR handling
- **Clean Disconnect**: Graceful cleanup and session removal

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Socket.IO Server

In one terminal window:

```bash
npm run server
```

Or manually:

```bash
node server.js
```

The server will start on `http://localhost:3001`

### 3. Start the Nuxt App

In another terminal window:

```bash
npm run dev
```

The app will start on `http://localhost:3000`

### 4. Test the Demo

1. Open `http://localhost:3000/experiments/secondscreen` in a desktop browser
2. Click "Show QR Code" to display the session QR code
3. Scan the QR code with your phone (or open the displayed URL in another browser)
4. Try scrolling on the mobile page - watch the desktop page scroll in sync!

## 📁 Project Structure

```
hmx-xd/
├── pages/
│   ├── experiments/
│   │   └── secondscreen.vue       # Desktop viewer page (generates QR code)
│   └── controller/
│       └── [sessionId].vue        # Mobile controller page (sends scroll commands)
├── plugins/
│   └── socket.client.ts           # Socket.IO client initialization (client-only)
├── composables/
│   └── useSecondScreen.ts         # Scroll sync and session management logic
├── server.js                      # Standalone Socket.IO server
├── .env.local                     # Socket.IO server URL configuration
└── README.md
```

## 🔧 Technical Architecture

### Desktop Viewer (`/experiments/secondscreen`)

- Generates unique session ID using `crypto.randomUUID()`
- Displays QR code linking to `/controller/[sessionId]`
- Listens to scroll events and emits position to Socket.IO server
- Receives scroll position updates from mobile controllers
- Shows connection status and participant count

### Mobile Controller (`/controller/[sessionId]`)

- Joins session via URL parameter
- Tracks device scroll position
- Emits throttled scroll position (30ms) to Socket.IO server
- Shows current scroll position and manual controls
- Displays connection status

### Socket.IO Server (`server.js`)

- Creates HTTP server on port 3001
- Manages sessions as Socket.IO rooms
- Routes scroll events to participants in same session
- Tracks participant roles (viewers vs controllers)
- Cleans up empty sessions automatically

### Socket.IO Client Plugin (`plugins/socket.client.ts`)

- Client-only execution (no SSR issues)
- Singleton Socket instance provided to entire app
- Automatic reconnection with exponential backoff
- Global error handling

### Composable (`composables/useSecondScreen.ts`)

- Throttled scroll event emission (30ms intervals)
- Session management (join/leave)
- Event listener attachment with auto-cleanup
- Mobile-specific scroll handling
- Connection status watching

## 🌐 WebSocket Events

### Client → Server

- **`join-session`**: Join a session with unique ID
  ```typescript
  { sessionId: "uuid-string" }
  ```

- **`scroll-position`**: Emit current scroll position (throttled)
  ```typescript
  { sessionId: "uuid-string", position: 1234 }
  ```

- **`leave-session`**: Leave session and disconnect
  ```typescript
  { sessionId: "uuid-string" }
  ```

### Server → Client

- **`participant-count`**: Updated count of active participants
  ```typescript
  5 // number
  ```

- **`scroll-position`**: Broadcast scroll position to session
  ```typescript
  { position: 1234, from: "socket-id" }
  ```

- **`session-status`**: Status of the current session
  ```typescript
  { sessionId: "uuid", participantCount: 5, controllers: 2, viewers: 3 }
  ```

## ⚙️ Configuration

### Environment Variables

Create or update `.env.local`:

```env
# Socket.IO Server URL
NUXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

For production, update to your server URL:

```env
NUXT_PUBLIC_SOCKET_URL=https://socketio.example.com
```

### Socket.IO Server Configuration

Edit `server.js` to customize:

- **PORT**: Change from 3001 to another port (line ~35)
- **CORS Origins**: Whitelist allowed domains (line ~7-12)
- **Transports**: Enable/disable WebSocket or polling (line ~13)

## 🎨 UI Components

### Desktop Viewer

- **Connection Status Bar**: Shows connected/disconnected state and participant count
- **QR Modal**: Displays QR code, session ID, and controller URL
- **Demo Content**: Tall scrollable sections demonstrating the feature
- **Quick Actions**: Show/hide QR code

### Mobile Controller

- **Connection Header**: Status bar with leave button
- **Scroll Position Display**: Live scroll value
- **Manual Controls**: Quick scroll buttons (+500px, -500px, to top)
- **Instructions**: Clear user guidance

## 🔒 Security Considerations

1. **Session IDs**: Generated with `crypto.randomUUID()` - statistically unique
2. **CORS**: Whitelist specific origins in production
3. **No Authentication**: Suitable for demo purposes
4. **SSL/TLS**: Use HTTPS in production with WSS (WebSocket Secure)

For production deployments, consider adding:

- User authentication
- Session expiration (timeout after inactivity)
- Rate limiting on scroll events
- Input validation and sanitization

## 🐛 Troubleshooting

### Socket.IO Connection Failed

1. Ensure server is running: `npm run server`
2. Check `NUXT_PUBLIC_SOCKET_URL` in `.env.local`
3. Verify firewall isn't blocking port 3001
4. Check browser console for connection errors

### QR Code Not Displaying

1. Ensure qrcode library is installed: `npm install qrcode`
2. Check that session ID is generated (look in browser console)
3. Verify DOM container exists (check `ref="qrContainer"`)

### Scroll Not Syncing

1. Check both windows are on same session ID
2. Verify server is running and showing connection logs
3. Check browser DevTools Network tab for WebSocket
4. Try manual scroll buttons on mobile controller

### SSR Errors

The implementation prevents SSR errors by:

1. Using `ClientOnly` wrapper on interactive elements
2. Using `process.server` checks in composables
3. Using client-only plugin for Socket.IO (`plugins/socket.client.ts`)

## 📊 Performance Optimization

- **Throttled Events**: Scroll events are throttled to 30ms intervals (server-side in composable)
- **Passive Listeners**: Event listeners use `{ passive: true }` for better scrolling performance
- **Cleanup**: All event listeners auto-cleanup on component unmount
- **Room Broadcasting**: Socket.IO rooms prevent unnecessary message broadcasting

## 🚀 Production Deployment

### Nuxt App

```bash
npm run build
npm run preview
```

Deploy to Vercel, Netlify, or your preferred platform.

### Socket.IO Server

Deploy to a separate service:

1. **Heroku**:
   ```bash
   heroku create secondscreen-server
   git push heroku main
   ```

2. **Self-Hosted**:
   ```bash
   pm2 start server.js --name "secondscreen"
   pm2 save
   ```

3. **Docker**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY server.js .
   CMD ["node", "server.js"]
   ```

Update `NUXT_PUBLIC_SOCKET_URL` to point to your production server.

## 📝 Code Quality

- **TypeScript**: Fully typed with Vue 3 Composition API
- **Nuxt 3**: Latest best practices and conventions
- **Composables**: Reusable, well-documented logic
- **Comments**: Inline explanations for complex sections
- **Error Handling**: Graceful fallbacks and error messages

## 🤝 Contributing

This demo is part of the portfolio. For improvements:

1. Test thoroughly on both desktop and mobile browsers
2. Follow existing code style and TypeScript patterns
3. Add comments for non-obvious logic
4. Update this README with new features

## 📄 License

Part of the personal portfolio project.

## 🎓 Learning Resources

- [Nuxt 3 Documentation](https://nuxt.com)
- [Socket.IO Documentation](https://socket.io/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [WebSocket Best Practices](https://www.ably.io/topic/websockets)

---

**Status**: ✅ Production Ready

Last updated: January 2026
