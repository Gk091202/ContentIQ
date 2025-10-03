# Deployment Guide for ContentIQ

This guide provides step-by-step instructions for deploying ContentIQ to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Post-Deployment](#post-deployment)

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- OpenAI API key
- MongoDB Atlas account (or other MongoDB hosting)
- Render/Heroku account (for backend)
- Vercel/Netlify account (for frontend)

## MongoDB Setup

### Using MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create a Cluster**

   - Click "Build a Database"
   - Select FREE tier (M0)
   - Choose your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**

   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**

   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Save this for backend deployment

## Backend Deployment

### Option 1: Deploy to Render

1. **Prepare Your Code**

   ```bash
   # Ensure package.json has correct scripts
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

2. **Create Render Account**

   - Go to [Render](https://render.com)
   - Sign up and verify email

3. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the ContentIQ repository

4. **Configure Service**

   - **Name**: `contentiq-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables**
   Click "Advanced" and add:

   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/contentiq?retryWrites=true&w=majority
   JWT_SECRET=your_secure_jwt_secret_at_least_32_characters
   OPENAI_API_KEY=sk-your-openai-api-key
   PORT=5000
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://contentiq-backend.onrender.com`)

### Option 2: Deploy to Heroku

1. **Install Heroku CLI**

   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku

   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**

   ```bash
   heroku login
   ```

3. **Create Heroku App**

   ```bash
   cd backend
   heroku create contentiq-backend
   ```

4. **Set Environment Variables**

   ```bash
   heroku config:set MONGO_URI="mongodb+srv://user:pass@cluster.mongodb.net/contentiq"
   heroku config:set JWT_SECRET="your_secure_jwt_secret"
   heroku config:set OPENAI_API_KEY="sk-your-openai-api-key"
   ```

5. **Deploy**

   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

## Frontend Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Prepare Your Code**

   - Ensure `.env.example` exists
   - Update VITE_API_URL in code to use environment variable

2. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel**

   ```bash
   vercel login
   ```

4. **Deploy**

   ```bash
   cd frontend
   vercel
   ```

5. **Configure Project**

   - Follow prompts
   - Set up and deploy: Y
   - Which scope: Your account
   - Link to existing project: N
   - Project name: contentiq
   - Directory: `./`
   - Override settings: N

6. **Add Environment Variable**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - Name: `VITE_API_URL`
     - Value: Your backend URL (e.g., `https://contentiq-backend.onrender.com`)
   - Save

7. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy to Netlify

1. **Prepare Build**

   ```bash
   cd frontend
   npm run build
   ```

2. **Create Netlify Account**

   - Go to [Netlify](https://www.netlify.com)
   - Sign up with GitHub

3. **Deploy via GitHub**

   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select ContentIQ repository
   - Configure:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/dist`

4. **Add Environment Variables**

   - Go to Site settings → Environment variables
   - Add:
     - Key: `VITE_API_URL`
     - Value: Your backend URL
   - Save

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete

## Post-Deployment

### 1. Test Your Application

Test all features:

- Sign up new user
- Login
- Generate content
- Summarize content
- Edit/delete content
- Export PDF
- Dark mode toggle

### 2. Update CORS Settings

If you get CORS errors, update backend server.js:

```javascript
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3000", "https://your-frontend-url.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
```

### 3. Monitor Your Application

#### Render Monitoring

- Go to your service dashboard
- Check "Logs" tab for errors
- Monitor "Metrics" for performance

#### Vercel Monitoring

- Go to project dashboard
- Check "Deployments" for build status
- View "Analytics" for usage stats

### 4. Set Up Custom Domain (Optional)

#### For Vercel

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

#### For Render

1. Go to service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as instructed

### 5. Enable SSL/HTTPS

Both Render and Vercel automatically provide SSL certificates. No additional configuration needed!

## Troubleshooting

### Backend Issues

**Problem**: Server not starting

- Check logs for errors
- Verify all environment variables are set
- Check MongoDB connection string

**Problem**: API requests failing

- Verify CORS settings
- Check network rules in MongoDB Atlas
- Ensure OpenAI API key is valid

### Frontend Issues

**Problem**: API calls failing

- Check `VITE_API_URL` environment variable
- Verify backend URL is correct
- Check browser console for errors

**Problem**: Build failures

- Run `npm run build` locally first
- Check for TypeScript or linting errors
- Verify all dependencies are in package.json

### Database Issues

**Problem**: Cannot connect to MongoDB

- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure user has correct permissions

## Scaling Considerations

### Performance Optimization

1. Enable MongoDB connection pooling
2. Implement Redis caching for frequent queries
3. Use CDN for static assets
4. Optimize images and bundle sizes

### Security Best Practices

1. Rotate JWT secrets regularly
2. Implement rate limiting
3. Add input validation and sanitization
4. Use HTTPS only
5. Regular security audits

## Cost Estimation

### Free Tier Limits

- **MongoDB Atlas**: 512 MB storage
- **Render**: 750 hours/month
- **Vercel**: 100 GB bandwidth/month
- **OpenAI**: Pay-per-use (monitor usage)

### Upgrade When

- MongoDB storage exceeds 512 MB
- Backend needs more than 512 MB RAM
- Traffic exceeds free tier limits

## Support

If you encounter issues:

1. Check the [DOCUMENTATION.md](./DOCUMENTATION.md)
2. Review logs in deployment platform
3. Check GitHub issues
4. Contact support for your hosting provider

---

**Congratulations!** Your ContentIQ application is now live! 🎉
