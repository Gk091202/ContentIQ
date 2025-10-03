# 🚨 FIX: 404 NOT_FOUND Error on Signup/Login

## Problem
You're getting this error when clicking Sign Up:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: bom1::t7hnp-1759529117987-9f46c8165a86
```

This error comes from **Vercel** and means your frontend cannot reach your backend API.

---

## 🎯 Root Cause

Your **frontend environment variable is NOT SET** or is set to the wrong backend URL.

The frontend is trying to call:
- ❌ `undefined/api/auth/signup` 
- ❌ `localhost:5001/api/auth/signup` (doesn't exist in production)
- ❌ Wrong backend URL

---

## ✅ IMMEDIATE FIX (3 Steps)

### Step 1: Get Your Backend URL

**Where did you deploy your backend?**

#### If on Render:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Find your `contentiq-backend` service
3. Copy the URL - looks like: `https://contentiq-backend-xxxx.onrender.com`

#### If on Railway:
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Find your backend service
3. Go to Settings → Domains
4. Copy the URL - looks like: `https://contentiq-backend-xxxx.up.railway.app`

#### If on Heroku:
1. Go to [Heroku Dashboard](https://dashboard.heroku.com/)
2. Find your app
3. Copy the URL - looks like: `https://contentiq-backend-xxxx.herokuapp.com`

**⚠️ Test your backend URL:**
```
Open in browser: https://YOUR-BACKEND-URL/api/health
Should return: {"status":"ok","message":"Backend is running"}
```

If you get an error, your **backend isn't deployed yet**. Deploy it first!

---

### Step 2: Add Environment Variable to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your `ContentIQ` project

2. **Go to Settings:**
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar

3. **Add the variable:**
   ```
   Name: VITE_API_URL
   Value: https://your-actual-backend-url.onrender.com
   ```
   
   **IMPORTANT:** Use your actual backend URL from Step 1!
   
   Examples:
   - ✅ `https://contentiq-backend-abc123.onrender.com`
   - ✅ `https://contentiq-backend.up.railway.app`
   - ❌ `http://localhost:5001` (WRONG - this is local!)
   - ❌ `localhost:5001` (WRONG - missing protocol!)

4. **Select Environment:**
   - Check: ☑️ Production
   - Check: ☑️ Preview
   - Check: ☑️ Development

5. **Click "Save"**

---

### Step 3: Redeploy Frontend

**After adding the environment variable, you MUST redeploy:**

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the three dots `⋯` → **"Redeploy"**
4. Select: ☑️ "Use existing Build Cache"
5. Click **"Redeploy"**

**Wait 2-3 minutes** for redeployment to complete.

---

## 🧪 Test Your Fix

### 1. Check Environment Variable:
After redeployment, verify the env var is set:
1. Go to Vercel → Your project → Settings → Environment Variables
2. You should see: `VITE_API_URL` with your backend URL

### 2. Test Backend:
```bash
# In your browser, visit:
https://YOUR-BACKEND-URL/api/health

# Should return:
{"status":"ok","message":"Backend is running"}
```

### 3. Test Frontend:
1. Open your Vercel frontend URL
2. Open Browser Console (F12 → Console tab)
3. Click "Sign Up"
4. Watch the console - you should see the API request
5. If you see CORS errors, go to Step 4

### 4. Try Signing Up:
- Fill in username, email, password
- Click "Sign Up"
- Should redirect to dashboard ✅

---

## 🚨 Still Getting 404? Try These:

### Issue 1: Backend Not Deployed
**Symptom:** Backend URL returns error or "Not Found"

**Fix:**
1. Deploy your backend first to Render/Railway
2. Make sure it's running: Check `/api/health` endpoint
3. Then update Vercel environment variable

### Issue 2: Wrong Backend URL Format
**Symptom:** Still getting 404 after setting env var

**Fix:** Make sure URL has:
- ✅ `https://` (not `http://` for production)
- ✅ No trailing slash: `https://backend.com` not `https://backend.com/`
- ✅ Complete domain, not just `localhost`

### Issue 3: Environment Variable Not Applied
**Symptom:** Env var is set but still getting 404

**Fix:**
1. Delete the env var
2. Add it again
3. Redeploy (important!)
4. Clear browser cache or open incognito window

### Issue 4: CORS Errors After 404 Fixed
**Symptom:** 404 is gone but now getting CORS errors

**Fix - Update Backend CORS:**
1. Go to Render → Your backend service → Environment
2. Add environment variable:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Your backend will auto-redeploy
4. Wait 2-3 minutes and test again

---

## 📝 Complete Setup Checklist

Use this to verify everything is configured:

### Backend (Render/Railway):
- [ ] Backend deployed and running
- [ ] Environment variables set:
  - [ ] `MONGO_URI` (MongoDB Atlas connection string)
  - [ ] `JWT_SECRET` (32+ character secret)
  - [ ] `OPENAI_API_KEY` (your OpenAI key)
  - [ ] `PORT` (5001)
  - [ ] `NODE_ENV` (production)
  - [ ] `FRONTEND_URL` (your Vercel URL) - for CORS
- [ ] Health check works: `/api/health` returns OK
- [ ] Backend URL noted: `https://______.onrender.com`

### Frontend (Vercel):
- [ ] Frontend deployed
- [ ] Environment variable set:
  - [ ] `VITE_API_URL` = Your backend URL
- [ ] Redeployed after setting env var
- [ ] Frontend URL noted: `https://______.vercel.app`

### MongoDB Atlas:
- [ ] Cluster created and running
- [ ] Database user created
- [ ] IP whitelist: `0.0.0.0/0` (allow all)
- [ ] Connection string copied and used in backend

---

## 🔍 How to Debug in Browser

1. **Open your Vercel frontend URL**
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Try to sign up**
5. **Look for errors:**

**If you see:**
```
POST http://localhost:5001/api/auth/signup 404
```
→ **Environment variable is NOT set** - Go back to Step 2

**If you see:**
```
POST https://your-backend.onrender.com/api/auth/signup CORS error
```
→ **CORS issue** - Add `FRONTEND_URL` to backend env vars

**If you see:**
```
POST https://your-backend.onrender.com/api/auth/signup 500
```
→ **Backend error** - Check Render logs for errors

**If you see nothing:**
→ Request succeeded! ✅

---

## 🎯 Quick Reference

### Vercel Environment Variable:
```
Name: VITE_API_URL
Value: https://your-backend.onrender.com
Environment: Production, Preview, Development
```

### Render Environment Variables:
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_32_char_secret
OPENAI_API_KEY=sk-proj-...
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

---

## 📞 Need More Help?

### Check These Logs:

**Render Backend Logs:**
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab
4. Look for startup errors or API request errors

**Vercel Deployment Logs:**
1. Go to Vercel dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Check "Building" and "Functions" logs

**Browser Console:**
1. Open your app in browser
2. Press F12
3. Go to "Console" tab
4. Try signing up
5. Check for errors

---

## ✅ Success Criteria

Your fix is complete when:
- ✅ No 404 error when clicking Sign Up
- ✅ Sign up form submits successfully
- ✅ Redirects to dashboard after signup
- ✅ Can login with created account
- ✅ Can generate AI content
- ✅ No CORS errors in console

---

## 🚀 After Fix

Once your signup works:
1. ✅ Create a test account
2. ✅ Test content generation
3. ✅ Test content summarization
4. ✅ Test profile page
5. ✅ Test logout and login again

---

**🎉 Your app should work perfectly after following these steps!**

If you're still stuck, check:
1. Is backend actually deployed and running?
2. Does `/api/health` work?
3. Is `VITE_API_URL` set correctly on Vercel?
4. Did you redeploy after setting the env var?
