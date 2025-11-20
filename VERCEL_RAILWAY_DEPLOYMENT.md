# Deployment Guide: Vercel + Railway

This guide walks you through deploying **ContentIQ** with the frontend on **Vercel** and the backend on **Railway**.

## Architecture Overview

- **Frontend (React + Vite)**: Deployed on Vercel
- **Backend (Express + MongoDB)**: Deployed on Railway
- **Database**: MongoDB Atlas (or Railway-hosted MongoDB)

---

## Prerequisites

1. **GitHub Account** with your ContentIQ repository
2. **Vercel Account** (free tier available): https://vercel.com
3. **Railway Account** (free tier available): https://railway.app
4. **MongoDB Atlas Account** (or use Railway's MongoDB): https://www.mongodb.com/cloud/atlas

---

## Part 1: Deploy Backend to Railway

### Step 1: Create a New Project on Railway

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Connect your GitHub account and select the **ContentIQ** repository
5. Railway will auto-detect the backend configuration from `railway.json`

### Step 2: Configure Environment Variables

In your Railway project dashboard, go to **Variables** and add:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/contentiq?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Important Notes:**

- Replace `MONGO_URI` with your MongoDB Atlas connection string
- Generate a secure `JWT_SECRET` (at least 32 characters)
- Update `FRONTEND_URL` after deploying to Vercel (Step 8)

### Step 3: Set Root Directory (if needed)

If Railway doesn't auto-detect the backend folder:

1. Go to **Settings** → **Build**
2. Set **Root Directory** to `backend`
3. Set **Start Command** to `npm start`

### Step 4: Deploy

Railway will automatically build and deploy your backend. Wait for deployment to complete.

### Step 5: Get Your Backend URL

Once deployed, Railway will provide a public URL like:

```
https://contentiq-backend.railway.app
```

Copy this URL — you'll need it for the frontend deployment.

---

## Part 2: Deploy Frontend to Vercel

### Step 6: Create a New Project on Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your **ContentIQ** repository from GitHub
4. Vercel will auto-detect the Vite framework

### Step 7: Configure Build Settings

Vercel should auto-detect settings from `vercel.json`, but verify:

- **Framework Preset**: Vite
- **Root Directory**: Leave as `.` (root)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`

### Step 8: Add Environment Variables

In the Vercel project settings, go to **Environment Variables** and add:

```env
VITE_API_URL=https://your-backend.railway.app
```

Replace `https://your-backend.railway.app` with your actual Railway backend URL from Step 5.

### Step 9: Deploy

Click **Deploy**. Vercel will build and deploy your frontend.

### Step 10: Update Railway Backend CORS

Go back to Railway and update the `FRONTEND_URL` environment variable with your Vercel deployment URL:

```env
FRONTEND_URL=https://your-app.vercel.app
```

This ensures the backend accepts requests from your frontend domain.

---

## Part 3: Setup MongoDB (if not done)

### Option A: MongoDB Atlas (Recommended)

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (`0.0.0.0/0`) for Railway access
5. Get your connection string and add it to Railway's `MONGO_URI`

### Option B: Railway MongoDB Plugin

1. In your Railway project, click **"New"** → **"Database"** → **"Add MongoDB"**
2. Railway will auto-provision a MongoDB instance
3. Copy the `MONGO_URL` from the MongoDB service variables
4. Add it as `MONGO_URI` in your backend service

---

## Testing Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try signing up and logging in
3. Test content generation features
4. Check Railway logs if there are issues: Dashboard → **View Logs**

---

## Environment Variables Reference

### Backend (Railway)

| Variable       | Description               | Example                       |
| -------------- | ------------------------- | ----------------------------- |
| `PORT`         | Server port               | `5000`                        |
| `MONGO_URI`    | MongoDB connection string | `mongodb+srv://...`           |
| `JWT_SECRET`   | Secret key for JWT tokens | Min 32 characters             |
| `FRONTEND_URL` | Frontend deployment URL   | `https://your-app.vercel.app` |
| `NODE_ENV`     | Environment mode          | `production`                  |

### Frontend (Vercel)

| Variable       | Description     | Example                            |
| -------------- | --------------- | ---------------------------------- |
| `VITE_API_URL` | Backend API URL | `https://your-backend.railway.app` |

---

## Troubleshooting

### Backend Issues

**Issue**: "Cannot connect to MongoDB"

- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check Railway logs for detailed error messages

**Issue**: "CORS error"

- Ensure `FRONTEND_URL` in Railway matches your Vercel deployment URL exactly
- Include protocol (`https://`) in the URL

### Frontend Issues

**Issue**: "Network Error" or API calls failing

- Verify `VITE_API_URL` in Vercel matches your Railway backend URL
- Check Railway backend is running (visit `https://your-backend.railway.app/api/health`)
- Open browser DevTools → Network tab to see actual error

**Issue**: 404 on page refresh

- Already handled by `vercel.json` rewrites configuration
- If issue persists, verify `vercel.json` is in repository root

---

## Redeployment

### Redeploy Backend (Railway)

- Push changes to GitHub → Railway auto-deploys
- Or use Railway CLI: `railway up`

### Redeploy Frontend (Vercel)

- Push changes to GitHub → Vercel auto-deploys
- Or use Vercel CLI: `vercel --prod`

---

## Cost Considerations

- **Vercel Free Tier**: 100GB bandwidth/month, unlimited personal projects
- **Railway Free Tier**: $5 credit/month (~ 500 hours of usage)
- **MongoDB Atlas Free Tier**: 512MB storage, shared cluster

Both platforms offer generous free tiers for small projects.

---

## Next Steps

1. Set up custom domain on Vercel (optional)
2. Configure monitoring and alerts
3. Set up CI/CD pipelines for automated testing
4. Enable Vercel Analytics for frontend insights
5. Monitor Railway usage to stay within free tier

---

## Support

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

For project-specific issues, check the GitHub repository issues page.
