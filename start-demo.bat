@echo off
REM SecondScreen Demo - Quick Start Script for Windows
REM Starts both the Nuxt dev server and Socket.IO server

echo.
echo 🚀 Starting SecondScreen Demo...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start Socket.IO server in background
echo 🔌 Starting Socket.IO server on port 3001...
start "SecondScreen Server" node server.js

REM Give server time to start
timeout /t 2

REM Start Nuxt dev server
echo 🌐 Starting Nuxt dev server on port 3000...
echo.
echo 📝 Instructions:
echo 1. Open http://localhost:3000/experiments/secondscreen in your desktop browser
echo 2. Click 'Show QR Code'
echo 3. Scan with your phone or open the URL on another browser
echo 4. Scroll on mobile - watch desktop page scroll in real-time!
echo.

call npm run dev

pause
