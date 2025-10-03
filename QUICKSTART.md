# ContentIQ - Quick Start Guide

Get ContentIQ running on your local machine in 5 minutes!

## Prerequisites

Before you begin, make sure you have:

- ✅ Node.js (v16+) - [Download here](https://nodejs.org/)
- ✅ MongoDB - [Local install](https://www.mongodb.com/try/download/community) or [Atlas account](https://www.mongodb.com/cloud/atlas)
- ✅ OpenAI API Key - [Get one here](https://platform.openai.com/api-keys)

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ContentIQ.git
cd ContentIQ
```

### Step 2: Set Up Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
MONGO_URI=mongodb://localhost:27017/contentiq
JWT_SECRET=my_super_secret_jwt_key_min_32_chars
OPENAI_API_KEY=sk-your-actual-openai-key-here
PORT=5000
```

### Step 3: Set Up Frontend

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

✅ Backend running at `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

✅ Frontend running at `http://localhost:3000`

### Step 5: Test the Application

1. Open browser to `http://localhost:3000`
2. Click "Sign Up" and create an account
3. Login with your new credentials
4. Try generating content or summarizing text!

## Quick Test

### Generate Content

1. Go to Dashboard
2. Enter prompt: "5 tips for better productivity"
3. Select tone: Professional
4. Select length: Medium
5. Click "Generate"
6. Wait for AI to create content!

### Summarize Content

1. Paste any long text or article URL
2. Choose format (paragraph or bullets)
3. Click "Summarize"
4. View your concise summary!

## Troubleshooting

### Backend won't start?

```bash
# Check MongoDB is running
mongod --version

# For MongoDB Atlas, verify connection string
# Should look like: mongodb+srv://user:pass@cluster.mongodb.net/contentiq
```

### Frontend won't start?

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Can't generate content?

- Verify OpenAI API key is correct
- Check you have API credits
- Look at backend terminal for error messages

### MongoDB connection failed?

- For local MongoDB: Start MongoDB service
  - macOS: `brew services start mongodb-community`
  - Windows: Start MongoDB service from Services
- For Atlas: Check IP whitelist includes your IP

## Next Steps

- ✨ Explore all features in the dashboard
- 📄 Export content as PDF
- 🌙 Toggle dark mode
- 👤 View your profile and stats
- 🔍 Search and filter your content history

## Default Credentials

No default credentials - you must sign up!

## API Testing

Use tools like Postman or curl to test the API:

```bash
# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Development Tips

- Backend auto-reloads with nodemon
- Frontend hot-reloads with Vite
- Check browser console for frontend errors
- Check terminal for backend errors

## Need Help?

- 📖 Read [DOCUMENTATION.md](./DOCUMENTATION.md) for full documentation
- 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide
- 🐛 Check backend/frontend terminals for error messages

---

Happy coding! 🎉
