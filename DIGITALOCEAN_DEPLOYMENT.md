# 🚀 DigitalOcean Deployment Guide for ContentIQ

Complete step-by-step guide to deploy your AI-Powered Content Generator on DigitalOcean.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Option 1: Deploy on App Platform (Easiest)](#option-1-app-platform-easiest)
4. [Option 2: Deploy on Droplet (More Control)](#option-2-droplet-more-control)
5. [Database Setup](#database-setup)
6. [Domain & SSL Setup](#domain--ssl-setup)
7. [Estimated Costs](#estimated-costs)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

Before starting, ensure you have:

- ✅ DigitalOcean account ([Sign up here](https://www.digitalocean.com/))
- ✅ GitHub repository with your code (✓ Already done: `Gk091202/ContentIQ`)
- ✅ OpenAI API key
- ✅ Credit card or PayPal for DigitalOcean billing
- ✅ (Optional) Custom domain name

---

## 🏗️ Architecture Overview

Your app has 3 components:

1. **Frontend** (React + Vite) - Serves the UI
2. **Backend** (Node.js + Express) - API server
3. **Database** (MongoDB) - Data storage

**Deployment Strategy:**

- Frontend: DigitalOcean App Platform (Static Site)
- Backend: DigitalOcean App Platform (Node.js Service)
- Database: MongoDB Atlas (Free tier) or DigitalOcean Managed MongoDB

---

## 🎨 Option 1: App Platform (Easiest - Recommended)

DigitalOcean's App Platform is a PaaS (Platform as a Service) that handles infrastructure automatically.

### Step 1: Setup MongoDB Database

#### Option A: MongoDB Atlas (Recommended - Free Tier Available)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Create a **Free Cluster**:

   - Click "Build a Database"
   - Select "M0 Sandbox" (Free tier)
   - Choose region closest to your DigitalOcean region
   - Click "Create Cluster"

4. **Configure Network Access**:

   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Create Database User**:

   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password
   - Set role to "Read and write to any database"
   - Click "Add User"

6. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contentiq?retryWrites=true&w=majority`

#### Option B: DigitalOcean Managed MongoDB

1. Go to DigitalOcean Dashboard
2. Click "Databases" → "Create Database Cluster"
3. Select "MongoDB"
4. Choose plan (starts at $15/month)
5. Select region
6. Click "Create Database Cluster"
7. Wait for provisioning (5-10 minutes)
8. Copy the connection string from the cluster dashboard

---

### Step 2: Deploy Backend to App Platform

1. **Login to DigitalOcean**:

   - Go to [DigitalOcean Dashboard](https://cloud.digitalocean.com/)

2. **Create New App**:

   - Click "Apps" in left sidebar
   - Click "Create App"
   - Choose "GitHub" as source
   - Authorize DigitalOcean to access your GitHub account
   - Select repository: `Gk091202/ContentIQ`
   - Select branch: `main`
   - Click "Next"

3. **Configure Backend Service**:

   - DigitalOcean will auto-detect your app
   - Click "Edit" on the detected Node.js component
   - Configure as follows:
     ```
     Name: contentiq-backend
     Type: Web Service
     Source Directory: /backend
     Build Command: npm install
     Run Command: node server.js
     HTTP Port: 5001
     HTTP Request Routes: /api
     Instance Size: Basic ($5/month)
     Instance Count: 1
     ```

4. **Set Environment Variables** (Click "Environment Variables"):

   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contentiq
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   OPENAI_API_KEY=sk-proj-your-openai-api-key-here
   PORT=5001
   NODE_ENV=production
   ```

5. Click "Next"

---

### Step 3: Deploy Frontend to App Platform

1. **Add Frontend Component**:

   - In the same app, click "Add Component"
   - Choose "Static Site"
   - Select your GitHub repository
   - Configure as follows:
     ```
     Name: contentiq-frontend
     Type: Static Site
     Source Directory: /frontend
     Build Command: npm install && npm run build
     Output Directory: dist
     ```

2. **Set Frontend Environment Variables**:

   - Click "Environment Variables"
   - Add build-time environment variable:
     ```
     VITE_API_URL=https://contentiq-backend-xxxxx.ondigitalocean.app
     ```
   - ⚠️ **Important**: Replace with your actual backend URL (you'll get this after backend deploys)

3. Click "Next"

---

### Step 4: Review and Launch

1. **Review Configuration**:

   - App Name: `contentiq` (or your preferred name)
   - Region: Choose closest to your users
   - Review pricing (should be ~$5-12/month)

2. **Click "Create Resources"**

3. **Wait for Deployment** (5-10 minutes):

   - Watch the build logs
   - Both frontend and backend will deploy automatically

4. **Get URLs**:
   - Backend URL: `https://contentiq-backend-xxxxx.ondigitalocean.app`
   - Frontend URL: `https://contentiq-xxxxx.ondigitalocean.app`

---

### Step 5: Update Frontend Environment Variable

1. **Copy Backend URL**:

   - Go to your app dashboard
   - Copy the backend service URL

2. **Update Frontend**:
   - Go to frontend component settings
   - Update `VITE_API_URL` with the actual backend URL
   - Save changes
   - Frontend will automatically redeploy

---

### Step 6: Update Backend CORS

You need to allow your frontend domain in backend CORS settings.

**Update your `backend/server.js` file locally:**

```javascript
// Update CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://contentiq-xxxxx.ondigitalocean.app", // Add your frontend URL
  ],
  credentials: true,
};

app.use(cors(corsOptions));
```

**Push changes:**

```bash
git add backend/server.js
git commit -m "Update CORS for production frontend"
git push origin main
```

App Platform will automatically redeploy!

---

## 🖥️ Option 2: Droplet (More Control)

For those who prefer traditional VPS hosting with more control.

### Step 1: Create Droplet

1. **Login to DigitalOcean**
2. **Create Droplet**:

   - Click "Create" → "Droplets"
   - Choose Ubuntu 22.04 LTS
   - Choose plan: Basic ($6/month - 1GB RAM)
   - Select region closest to users
   - Authentication: SSH key (recommended) or password
   - Choose hostname: `contentiq-server`
   - Click "Create Droplet"

3. **Note your Droplet IP address**

---

### Step 2: Initial Server Setup

1. **SSH into your Droplet**:

   ```bash
   ssh root@your_droplet_ip
   ```

2. **Update system**:

   ```bash
   apt update && apt upgrade -y
   ```

3. **Install Node.js**:

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt install -y nodejs
   node -v  # Verify installation
   npm -v
   ```

4. **Install PM2** (Process Manager):

   ```bash
   npm install -g pm2
   ```

5. **Install Nginx** (Web Server):

   ```bash
   apt install -y nginx
   systemctl start nginx
   systemctl enable nginx
   ```

6. **Install Git**:

   ```bash
   apt install -y git
   ```

7. **Configure Firewall**:
   ```bash
   ufw allow OpenSSH
   ufw allow 'Nginx Full'
   ufw enable
   ```

---

### Step 3: Deploy Backend

1. **Clone Repository**:

   ```bash
   cd /var/www
   git clone https://github.com/Gk091202/ContentIQ.git
   cd ContentIQ/backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create Environment File**:

   ```bash
   nano .env
   ```

   Add:

   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contentiq
   JWT_SECRET=your_super_secret_jwt_key_change_this
   OPENAI_API_KEY=sk-proj-your-openai-api-key
   PORT=5001
   NODE_ENV=production
   ```

   Save: `Ctrl+X`, then `Y`, then `Enter`

4. **Start Backend with PM2**:

   ```bash
   pm2 start server.js --name contentiq-backend
   pm2 save
   pm2 startup  # Follow the instructions
   ```

5. **Verify Backend is Running**:
   ```bash
   pm2 status
   curl http://localhost:5001/api/health  # Should return OK
   ```

---

### Step 4: Deploy Frontend

1. **Build Frontend Locally** (on your Mac):

   ```bash
   cd /Users/gauravkoli/ContentIQ/frontend

   # Update .env with production backend URL
   echo "VITE_API_URL=http://your_droplet_ip:5001" > .env

   # Build
   npm run build
   ```

2. **Upload Build to Droplet**:

   ```bash
   scp -r dist root@your_droplet_ip:/var/www/ContentIQ/frontend/
   ```

   OR build on server:

   ```bash
   # SSH into droplet
   cd /var/www/ContentIQ/frontend

   # Create .env
   echo "VITE_API_URL=http://your_droplet_ip:5001" > .env

   # Build
   npm install
   npm run build
   ```

---

### Step 5: Configure Nginx

1. **Create Nginx Configuration**:

   ```bash
   nano /etc/nginx/sites-available/contentiq
   ```

2. **Add Configuration**:

   ```nginx
   server {
       listen 80;
       server_name your_droplet_ip;  # or your domain

       # Frontend
       location / {
           root /var/www/ContentIQ/frontend/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

3. **Enable Site**:

   ```bash
   ln -s /etc/nginx/sites-available/contentiq /etc/nginx/sites-enabled/
   nginx -t  # Test configuration
   systemctl reload nginx
   ```

4. **Access Your App**:
   - Open browser: `http://your_droplet_ip`

---

### Step 6: Setup SSL with Let's Encrypt (Optional but Recommended)

1. **Install Certbot**:

   ```bash
   apt install -y certbot python3-certbot-nginx
   ```

2. **Get SSL Certificate** (requires a domain):

   ```bash
   certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal**:
   ```bash
   certbot renew --dry-run
   ```

---

## 🌐 Domain & SSL Setup

### Connect Custom Domain

1. **In DigitalOcean Dashboard**:

   - Go to "Networking" → "Domains"
   - Add your domain
   - Add DNS records:
     - `A` record: `@` → Your Droplet IP
     - `A` record: `www` → Your Droplet IP

2. **In Your Domain Registrar** (GoDaddy, Namecheap, etc):

   - Update nameservers to:
     ```
     ns1.digitalocean.com
     ns2.digitalocean.com
     ns3.digitalocean.com
     ```

3. **Wait for DNS Propagation** (5 minutes - 48 hours)

4. **Update App Platform Domain** (if using App Platform):
   - Go to your app → Settings → Domains
   - Add your custom domain
   - Follow the verification steps

---

## 💰 Estimated Costs

### App Platform Option:

| Component            | Plan      | Cost                 |
| -------------------- | --------- | -------------------- |
| Backend Service      | Basic     | $5/month             |
| Frontend Static Site | Starter   | $0/month (free tier) |
| MongoDB Atlas        | Free Tier | $0/month             |
| **Total**            |           | **$5/month**         |

### Droplet Option:

| Component     | Plan            | Cost         |
| ------------- | --------------- | ------------ |
| Droplet       | Basic (1GB RAM) | $6/month     |
| MongoDB Atlas | Free Tier       | $0/month     |
| **Total**     |                 | **$6/month** |

### With Custom Domain:

- Domain Name: $10-15/year (from registrar)

---

## 🔧 Useful PM2 Commands (Droplet Deployment)

```bash
# View logs
pm2 logs contentiq-backend

# Restart app
pm2 restart contentiq-backend

# Stop app
pm2 stop contentiq-backend

# Monitor resources
pm2 monit

# List all processes
pm2 list

# Update code (after git pull)
cd /var/www/ContentIQ/backend
git pull origin main
npm install
pm2 restart contentiq-backend
```

---

## 🐛 Troubleshooting

### Backend Won't Start

```bash
# Check logs
pm2 logs contentiq-backend

# Common issues:
# 1. MongoDB connection - verify MONGO_URI
# 2. Port already in use - check with: lsof -ti:5001
# 3. Missing dependencies - run: npm install
```

### Frontend Shows Errors

```bash
# Check if VITE_API_URL is correct
# Rebuild frontend:
cd /var/www/ContentIQ/frontend
npm run build
```

### CORS Issues

- Ensure backend CORS allows your frontend domain
- Check `backend/server.js` CORS configuration

### MongoDB Connection Failed

- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Verify connection string has correct password
- Check if cluster is running

### SSL Certificate Issues

```bash
# Check certificate status
certbot certificates

# Renew manually
certbot renew --force-renewal
```

---

## 📚 Additional Resources

- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

---

## 🎉 Next Steps

1. Choose deployment method (App Platform recommended for beginners)
2. Setup MongoDB Atlas (free tier)
3. Deploy backend and frontend
4. Test your live application
5. (Optional) Add custom domain
6. (Optional) Setup SSL certificate
7. Monitor your app and scale as needed

---

## 💡 Pro Tips

1. **Use App Platform** if you want simplicity and automatic scaling
2. **Use Droplet** if you need full control and want to minimize costs
3. **Always use MongoDB Atlas free tier** to start - it's reliable and free
4. **Enable SSL** for production - it's important for security
5. **Monitor your OpenAI usage** to avoid unexpected costs
6. **Set up alerts** in DigitalOcean for resource usage
7. **Use environment variables** - never hardcode secrets
8. **Regular backups** - enable MongoDB Atlas backups or use DigitalOcean snapshots

---

## 🆘 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review DigitalOcean logs/console
3. Check PM2 logs: `pm2 logs`
4. Review Nginx logs: `tail -f /var/log/nginx/error.log`
5. MongoDB Atlas has detailed connection troubleshooting

---

**🚀 Happy Deploying!**

Your ContentIQ app is ready to serve users worldwide! 🌍
