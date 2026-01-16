# SecondScreen Demo - Verification Checklist

## ✅ Pre-Launch Checklist

### Environment Setup
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v8+ installed (`npm --version`)
- [ ] Project directory: `c:\Users\Hammas Masood\OneDrive\Desktop\hmx-xd`
- [ ] All dependencies installed (`npm install`)
- [ ] `.env.local` file exists with `NUXT_PUBLIC_SOCKET_URL=http://localhost:3001`

### Dependencies Verified
- [ ] `socket.io-client` installed (check `node_modules/socket.io-client`)
- [ ] `qrcode` installed
- [ ] `@types/qrcode` installed
- [ ] `socket.io` server installed (dev dependency)

### Code Quality
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] No ESLint warnings in main files
- [ ] All imports resolve correctly
- [ ] Socket.IO plugin loads (plugins/socket.client.ts exists)

## 🚀 Startup Checklist

### Terminal 1: Socket.IO Server
```bash
cd c:\Users\Hammas Masood\OneDrive\Desktop\hmx-xd
npm run server
```

**Verify output contains:**
- [ ] `🚀 SecondScreen Socket.IO server running on port 3001`
- [ ] `Make sure Nuxt app is running on http://localhost:3000`
- [ ] No error messages
- [ ] Server stays running (doesn't exit)

### Terminal 2: Nuxt Dev Server
```bash
cd c:\Users\Hammas Masood\OneDrive\Desktop\hmx-xd
npm run dev
```

**Verify output contains:**
- [ ] `✔ Ready in XXXms` or similar success message
- [ ] `Local: http://localhost:3000`
- [ ] No error messages
- [ ] Dev server stays running

### Firewall Check
- [ ] Port 3000 accessible locally
- [ ] Port 3001 accessible locally
- [ ] Ports not blocked by antivirus/firewall

## 🌐 Desktop Viewer Verification

### Page Load
1. Open browser: `http://localhost:3000/experiments/secondscreen`
2. **Verify elements:**
   - [ ] Page loads without errors
   - [ ] Gradient background visible
   - [ ] "SecondScreen Demo" title displays
   - [ ] Content is scrollable (tall page)

### Connection Status
- [ ] Green status bar at top
- [ ] Shows "Connected" text
- [ ] No error messages in console
- [ ] Socket indicator: connected ✓

### QR Code Modal
1. Click "Show QR Code" button
2. **Verify modal:**
   - [ ] Modal appears with fade animation
   - [ ] QR code displays (256x256 black/white grid)
   - [ ] Session ID visible (looks like UUID: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
   - [ ] Controller URL displayed
   - [ ] Close button functional

### Session ID Validation
- [ ] Session ID is 36 characters (UUID format)
- [ ] Contains hyphens in correct positions
- [ ] URL format: `http://localhost:3000/controller/[SESSION-ID]`
- [ ] Session ID doesn't change unless page refreshed

### Browser Console
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] **Should show:**
  - [ ] `Socket connected` message
  - [ ] No errors
  - [ ] No network warnings

### Network Tab
- [ ] Open Network tab in DevTools
- [ ] **Should see:**
  - [ ] WebSocket connection to `localhost:3001`
  - [ ] Status: 101 (Switching Protocols)
  - [ ] No failed requests

## 📱 Mobile Controller Verification

### Access Controller
1. **Option A:** Scan QR code with phone/tablet
2. **Option B:** Manually navigate to displayed URL in new window/tab
3. **Wait for page load**

### Page Load
- [ ] Controller page loads
- [ ] No errors displayed
- [ ] Mobile-responsive layout
- [ ] All buttons visible

### Connection Status
- [ ] Green status bar shows "Connected to Session"
- [ ] Leave button visible and clickable
- [ ] Session ID matches desktop page

### Scroll Position Display
- [ ] "Scroll Position" section visible
- [ ] Shows current number (starts at 0)
- [ ] Updates live as you scroll

### Manual Controls
1. **Test "Scroll Up" button:**
   - [ ] Click button
   - [ ] Page scrolls down 500px
   - [ ] Scroll position number updates

2. **Test "Scroll Down" button:**
   - [ ] Click button
   - [ ] Page scrolls down 500px
   - [ ] Scroll position number updates

3. **Test "To Top" button:**
   - [ ] Click button
   - [ ] Page jumps to top
   - [ ] Scroll position returns to 0

## 🔄 Real-Time Sync Testing

### Desktop-to-Mobile Awareness
1. With both pages open side-by-side
2. **On desktop:**
   - [ ] Scroll up/down
   - [ ] Status shows participant count: "1 controller"
3. **On mobile:**
   - [ ] Try scrolling manually
   - [ ] Try clicking buttons
   - [ ] All works independently

### Multiple Controllers (Optional)
1. Open controller page in 3rd window (use URL directly)
2. **Desktop shows:**
   - [ ] Status updates to "2 controllers"
3. **Both mobile pages:**
   - [ ] Both show connected
   - [ ] Both show same session ID
   - [ ] Both receive updates simultaneously

### Disconnect Testing
1. Close mobile controller tab/window
2. **Desktop immediately updates:**
   - [ ] Participant count decreases
   - [ ] Status may flash briefly
3. **Reopen controller:**
   - [ ] Can rejoin by scanning QR again
   - [ ] Gets new connection
   - [ ] Works normally

## 🔍 Console/Network Monitoring

### Desktop Console (expected messages)
```
Socket connected
Participant count: 1
```

### Mobile Console (expected messages)
```
Joined session: [SESSION-ID]
Socket connected
Participant count: 1
```

### Server Logs (expected output)
```
Client connected: [ID]
Client [ID] joined session [SESSION-ID] as controller
Participant count updated: 1
```

### WebSocket Messages
1. Open DevTools → Network → WS
2. Scroll on mobile
3. **Should see messages like:**
   - `scroll-position` events
   - JSON payload with position number
   - Multiple events (one per 30ms throttle)

## 🧪 Edge Case Testing

### Network Issues
- [ ] Refresh page - reconnects automatically
- [ ] Close browser tab - graceful disconnect
- [ ] Open new tab - new session created
- [ ] Multiple rapid connections - server handles correctly

### Performance
- [ ] Scroll rapidly on mobile - no lag
- [ ] Check CPU usage - stays low (< 10%)
- [ ] Check memory - doesn't grow indefinitely
- [ ] Monitor for memory leaks - stays stable

### Input Validation
- [ ] Manual URL with invalid session ID - shows error
- [ ] Try accessing `/controller/invalid` - error message
- [ ] Session ID copied correctly - always matches

## 📊 Diagnostic Commands

### Check Ports in Use
```bash
# Windows (PowerShell)
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Mac/Linux
lsof -i :3000
lsof -i :3001
```

### Check Node Process
```bash
# List Node processes
tasklist | findstr node  # Windows
ps aux | grep node       # Mac/Linux
```

### View Socket.IO Connections
Enable debug in browser console:
```javascript
// In browser console
localStorage.debug = '*'
// Refresh page to see detailed logs
```

## ✨ Visual Verification Checklist

### Desktop Page
- [ ] Gradient background visible and smooth
- [ ] Text is readable (white text on dark background)
- [ ] Buttons have hover effects
- [ ] Modal has proper styling
- [ ] All sections visible when scrolling
- [ ] No layout shifts when scrolling
- [ ] Animations smooth (no jank)

### Mobile Page
- [ ] Layout responsive to screen size
- [ ] Buttons are touch-friendly (large enough)
- [ ] Text is readable on small screens
- [ ] No horizontal scrolling needed
- [ ] Status bar doesn't cover content
- [ ] Scroll position number is readable

### QR Code
- [ ] QR code is square (256x256px)
- [ ] Pattern is clear and scannable
- [ ] Black squares on white background
- [ ] No distortion or artifacts
- [ ] Can be scanned with phone camera

## 🎯 Success Criteria

✅ **All items checked = Demo is ready!**

### Minimum Viable Test
1. [ ] Desktop loads and shows connected
2. [ ] QR code displays
3. [ ] Mobile controller page loads
4. [ ] Both show same session ID
5. [ ] Scrolling on mobile works
6. [ ] No console errors on either page
7. [ ] Server logs show connections

### Full Feature Test
1. [ ] Multiple controllers work together
2. [ ] Disconnect/reconnect works
3. [ ] Manual buttons work on mobile
4. [ ] Real-time scroll sync visible
5. [ ] Connection status updates live
6. [ ] No memory leaks over time
7. [ ] Performance is smooth

## 🐛 Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| Port 3001 in use | Kill process: `netstat -ano` then `taskkill /PID xxx` |
| "Socket not found" | Restart both servers |
| QR code blank | Check `.env.local` has correct URL |
| Mobile can't connect | Verify network - use `localhost` not `127.0.0.1` for local |
| Scroll not updating | Check throttle timing in composable (30ms) |
| Blank page | Check console for errors, verify SSR isn't running |

## 📋 Final Sign-Off

- [ ] All prerequisites met
- [ ] Both servers running
- [ ] Page loads without errors
- [ ] QR code scans successfully
- [ ] Mobile joins session
- [ ] Scrolling syncs in real-time
- [ ] Connection status shows correctly
- [ ] No console errors
- [ ] Performance is smooth
- [ ] Ready to demo!

---

**When everything is checked:** 
🎉 **SecondScreen Demo is ready to showcase!**

**Estimated time:** 5-10 minutes for full verification
