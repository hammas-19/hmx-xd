#!/bin/bash

# SecondScreen Demo - Quick Start Script
# Starts both the Nuxt dev server and Socket.IO server

echo "🚀 Starting SecondScreen Demo..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start Socket.IO server in background
echo "🔌 Starting Socket.IO server on port 3001..."
node server.js &
SOCKET_PID=$!

# Give server time to start
sleep 2

# Start Nuxt dev server
echo "🌐 Starting Nuxt dev server on port 3000..."
echo ""
echo "📝 Instructions:"
echo "1. Open http://localhost:3000/experiments/secondscreen in your desktop browser"
echo "2. Click 'Show QR Code'"
echo "3. Scan with your phone or open the URL on another browser"
echo "4. Scroll on mobile - watch desktop page scroll in real-time!"
echo ""

npm run dev

# Cleanup on exit
trap "kill $SOCKET_PID" EXIT
