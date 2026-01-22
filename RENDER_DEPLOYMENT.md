# Deploying Socket.IO Server to Render.com

This guide walks you through deploying the SecondScreen Socket.IO server to Render.com's free tier.

## Step 1: Create Render.com Account

1. Go to https://render.com
2. Sign up with GitHub (recommended for easy deployment)
3. Authorize Render to access your GitHub repos

## Step 2: Create Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Select your GitHub repository (`hmx-xd` or wherever this code is)
3. Fill in:
   - **Name:** `secondscreen-socket-server` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Click **"Create Web Service"**

## Step 3: Configure Environment Variables

1. In your Render service dashboard, go to **Environment** tab
2. Add these environment variables:
   ```
   CLIENT_URL=https://your-site.netlify.app
   ```
   (Replace with your actual Netlify domain)

3. Click **"Save"** - Render will automatically redeploy

## Step 4: Get Your Server URL

After deployment completes:
1. Go to your service dashboard
2. Copy the URL from the top (looks like: `https://secondscreen-socket-server.onrender.com`)
3. This is your `NUXT_PUBLIC_SOCKET_URL`

## Step 5: Update Netlify Environment Variables

1. Go to your Netlify site dashboard
2. **Site settings** → **Environment variables**
3. Add:
   - **Key:** `NUXT_PUBLIC_SOCKET_URL`
   - **Value:** `https://secondscreen-socket-server.onrender.com` (your actual Render URL)
4. Click **"Save"**

Netlify will automatically redeploy your site with the new environment variable.

## Step 6: Update Local .env

Update `.env.local` locally for testing:

```env
NUXT_PUBLIC_SOCKET_URL=https://secondscreen-socket-server.onrender.com
```

Then rebuild locally:
```bash
npm run build
npm run dev
```

## Step 7: Test

1. Visit your Netlify site: `https://your-site.netlify.app/experiments/secondscreen`
2. Generate a session and scan the QR code
3. Open the mobile controller URL in another browser/device
4. Verify scroll synchronization works

## Troubleshooting

### Server Not Connecting

**Check CORS:** The server logs will show which origin it accepts. If your Netlify domain isn't working:

1. Go to Render dashboard
2. Go to **Logs** and check for CORS errors
3. Verify `CLIENT_URL` environment variable matches your Netlify domain exactly
4. Redeploy: Click **"Manual Deploy"** on Render

### Render Goes to Sleep

Render's free tier spins down inactive services after 15 minutes. If your connection drops:
- The server wakes up when a request comes in
- Reconnection happens automatically (configured with backoff in `plugins/socket.client.ts`)
- No additional configuration needed

### WebSocket Connection Fails

1. Check browser console (F12) for errors
2. Verify `NUXT_PUBLIC_SOCKET_URL` is set correctly in Netlify
3. Ensure Render service is running (check Render dashboard)
4. Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## Monitoring Logs

To see real-time logs from your Render server:

1. Go to Render dashboard → Your service
2. Click **"Logs"** tab
3. Scroll to see connection events and errors

## Keeping Server Awake (Optional Paid)

To prevent the free tier from spinning down after 15 min of inactivity:

1. Upgrade to Render's paid tier ($7/month)
2. Or use a service like https://cron-job.org to ping the server every 10 minutes

## Next Steps

- Your SecondScreen demo is now live! 
- Share the URL: `https://your-site.netlify.app/experiments/secondscreen`
- Check [DEMO_GUIDE.md](DEMO_GUIDE.md) for demo instructions

## References

- [Render Docs: Deploy with Node.js](https://render.com/docs/deploy-node-express-app)
- [Socket.IO CORS](https://socket.io/docs/v4/handling-cors/)
- [Environment Variables on Render](https://render.com/docs/environment-variables)
