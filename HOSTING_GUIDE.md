# 🚀 ContentIQ Hosting Guide

## Quick Deploy (20 minutes total)

Your code is already on GitHub and ready to deploy! Follow these steps:

---

## 1. Database: MongoDB Atlas (FREE)

### Setup (5 minutes)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Build a Database** → FREE (M0 Sandbox)
3. **Create Database User**:
   - Username: contentiq_user
   - Password: (generate strong password)
   - Save these credentials!
4. **Network Access** → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. **Get Connection String**:
   - Database → Connect → Drivers
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://contentiq_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contentiq?retryWrites=true&w=majority`

---

## 2. Backend: Render (FREE)

### Deploy (10 minutes)

1. **Create Account**: https://render.com (Sign up with GitHub)

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `Gk091202/ContentIQ`
   - Click "Connect"

3. **Configure Service**:
   ```
   Name: contentiq-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Environment Variables** (Click "Advanced"):
   ```
   MONGO_URI=mongodb+srv://contentiq_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/contentiq
   JWT_SECRET=contentiq_super_secret_jwt_key_must_be_at_least_32_characters_long
   OPENAI_API_KEY=sk-your-openai-api-key-here
   PORT=5000
   ```

5. **Create Web Service** → Wait 5-10 minutes for deployment

6. **Copy Backend URL**: 
   - Example: `https://contentiq-backend.onrender.com`
   - Save this for frontend deployment!

7. **Test Backend**:
   - Open: `https://contentiq-backend.onrender.com/api/auth/signup`
   - Should see: `{"message":"Server error."}`
   - This means backend is working!

---

## 3. Frontend: Vercel (FREE)

### Deploy (5 minutes)

#### Option A: Vercel Dashboard (Easiest)

1. **Create Account**: https://vercel.com (Sign up with GitHub)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import Git Repository
   - Select: `Gk091202/ContentIQ`

3. **Configure Project**:
   ```
   Project Name: contentiq
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Environment Variables**:
   ```
   Key: VITE_API_URL
   Value: https://contentiq-backend.onrender.com
   ```
   (Use YOUR backend URL from step 2)

5. **Deploy** → Wait 2-3 minutes

6. **Get Live URL**: 
   - Example: `https://contentiq.vercel.app`
   - Click to test your live application!

#### Option B: Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: contentiq
# - Directory: ./
# - Override settings? N

# Add environment variable
vercel env add VITE_API_URL production
# Enter: https://contentiq-backend.onrender.com

# Deploy to production
vercel --prod
```

---

## 4. Update Backend CORS (Important!)

After deploying frontend, update backend CORS:

1. **Edit** `backend/server.js`:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'https://contentiq.vercel.app'  // Add your Vercel URL
     ],
     credentials: true
   };
   
   app.use(cors(corsOptions));
   ```

2. **Commit and Push**:
   ```bash
   cd /Users/gauravkoli/ContentIQ
   git add backend/server.js
   git commit -m "Add production CORS origin"
   git push origin main
   ```

3. Render will auto-deploy the update!

---

## 5. Test Your Live Application

1. **Visit Your Frontend**: `https://contentiq.vercel.app`
2. **Sign Up**: Create a test account
3. **Login**: Test authentication
4. **Generate Content**: Try the AI features
5. **Check All Features**: Dark mode, PDF export, etc.

---

## 🎉 Your Application is Live!

### Live URLs:
- **Frontend**: https://contentiq.vercel.app
- **Backend**: https://contentiq-backend.onrender.com
- **Database**: MongoDB Atlas (managed)

### Free Tier Limits:
- **MongoDB Atlas**: 512 MB storage
- **Render**: 750 hours/month (plenty for one app)
- **Vercel**: 100 GB bandwidth/month
- **Total Cost**: $0/month

---

## 🔧 Alternative Hosting Options

### Backend Alternatives:

**Railway** (Recommended #2)
- Website: https://railway.app
- Pros: Even easier than Render, $5 free credit
- Setup: Connect GitHub → Deploy
- Cons: After free credit, paid only

**Heroku**
- Website: https://heroku.com
- Pros: Industry standard, easy CLI
- Cons: No free tier anymore ($7/month minimum)

**AWS EC2 Free Tier**
- Website: https://aws.amazon.com
- Pros: 750 hours/month free for 12 months
- Cons: More complex setup, requires AWS knowledge

### Frontend Alternatives:

**Netlify**
- Website: https://netlify.com
- Pros: Great free tier, similar to Vercel
- Setup: Import from GitHub → Deploy
- Cons: Slightly slower build times

**GitHub Pages**
- Website: https://pages.github.com
- Pros: Free, integrated with GitHub
- Cons: Static only (need backend elsewhere)

---

## 📊 Monitoring Your Application

### Render Dashboard:
- View logs
- Check metrics
- Monitor uptime

### Vercel Dashboard:
- View deployments
- Check analytics
- Monitor performance

### MongoDB Atlas:
- View database metrics
- Monitor connections
- Check storage usage

---

## 🐛 Troubleshooting

### Backend won't start:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Check MongoDB connection string
4. Ensure OpenAI API key is valid

### Frontend can't connect to backend:
1. Check VITE_API_URL is correct
2. Verify backend is running (visit backend URL)
3. Check backend CORS settings
4. Open browser console for errors

### Database connection failed:
1. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
2. Verify connection string format
3. Check database user permissions
4. Test connection from local first

### OpenAI API errors:
1. Verify API key is correct
2. Check you have credits in OpenAI account
3. Monitor usage at platform.openai.com

---

## 🔒 Security Best Practices

✅ Never commit `.env` files (already in `.gitignore`)
✅ Use strong JWT secrets (32+ characters)
✅ Rotate API keys regularly
✅ Monitor OpenAI usage to avoid unexpected charges
✅ Set up MongoDB Atlas IP whitelist in production
✅ Enable 2FA on all hosting accounts

---

## 💰 Cost Scaling

### When to Upgrade:

**MongoDB Atlas**:
- Upgrade when: >512 MB data
- Cost: $9/month for 2GB

**Render**:
- Upgrade when: Need faster performance
- Cost: $7/month for 0.5 CPU

**Vercel**:
- Usually stays free unless: >100GB bandwidth
- Cost: $20/month for Pro

---

## 🚀 Advanced: Custom Domain

### Add Custom Domain (Optional):

1. **Buy Domain**: Namecheap, GoDaddy, or Google Domains
2. **Vercel Setup**:
   - Project Settings → Domains
   - Add your domain (e.g., contentiq.com)
   - Follow DNS configuration
3. **SSL**: Automatically provided by Vercel

---

## 📱 Mobile App (Future Enhancement)

Your API is ready for mobile apps:
- React Native app can use same backend
- Expo for easier development
- API endpoints are mobile-friendly

---

## ✨ Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Share your live URL with friends
3. ✅ Add project to your portfolio
4. ✅ Monitor usage and costs
5. ✅ Gather user feedback
6. ✅ Plan new features

---

**Your ContentIQ application is production-ready! 🎊**

Need help? Check the logs in Render and Vercel dashboards.
