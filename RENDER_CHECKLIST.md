# Render.com Deployment Checklist

Follow these steps in order to deploy your SecondScreen socket server to Render.com.

## Pre-Deployment ✓

- [ ] Read [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
- [ ] Confirm Netlify site is deployed and working
- [ ] Have your Netlify domain ready (e.g., `https://your-site.netlify.app`)

## Create Render Service ✓

- [ ] Go to https://render.com
- [ ] Sign up / Log in with GitHub
- [ ] Create new **Web Service**
- [ ] Connect to your GitHub repo
- [ ] Set **Build Command:** `npm install`
- [ ] Set **Start Command:** `node server.js`
- [ ] Click **"Create Web Service"**

## Configure Render ✓

- [ ] Wait for initial deployment (2-3 minutes)
- [ ] Go to **Environment** tab
- [ ] Add `CLIENT_URL=https://your-site.netlify.app` (your Netlify domain)
- [ ] Save (auto-redeploy)
- [ ] Copy Render service URL from top of dashboard
  - Format: `https://secondscreen-socket-server.onrender.com`

## Update Netlify ✓

- [ ] Go to Netlify dashboard
- [ ] Site settings → Environment variables
- [ ] Add `NUXT_PUBLIC_SOCKET_URL=https://[your-render-url]`
  - Replace `[your-render-url]` with actual Render domain
- [ ] Save (auto-redeploy)

## Update Local .env (Optional) ✓

- [ ] Update `.env.local`:
  ```env
  NUXT_PUBLIC_SOCKET_URL=https://your-render-url
  ```
- [ ] Run `npm run build && npm run dev` to test locally

## Test Production ✓

- [ ] Visit: `https://your-site.netlify.app/experiments/secondscreen`
- [ ] Check browser console (F12) for connection status
- [ ] Generate session and get QR code
- [ ] Open mobile controller in another browser/device
- [ ] Test scroll synchronization
- [ ] Verify both directions work

## Verify Logs (Troubleshooting) ✓

- [ ] Go to Render dashboard
- [ ] Click **"Logs"** tab
- [ ] Should see: `🚀 SecondScreen Socket.IO server running on port 10000`
- [ ] No CORS errors should appear

## Done! 🎉

Your SecondScreen demo is live at:
```
https://your-site.netlify.app/experiments/secondscreen
```

## Quick Help

| Issue | Solution |
|-------|----------|
| Connection fails | Check `NUXT_PUBLIC_SOCKET_URL` in Netlify env vars |
| CORS errors | Verify `CLIENT_URL` on Render matches Netlify domain |
| Server sleeping | Normal on free tier after 15 min - reconnects automatically |
| Logs not updating | Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) |

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for full troubleshooting guide.
