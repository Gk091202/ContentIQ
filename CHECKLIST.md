# ✅ ContentIQ Setup Checklist

Use this checklist to ensure your ContentIQ application is properly set up and ready to use.

## 📋 Pre-Installation Checklist

- [ ] Node.js v16+ installed ([Download](https://nodejs.org/))
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] OpenAI API account created ([Sign up](https://platform.openai.com/))
- [ ] OpenAI API key obtained
- [ ] Git installed (optional, for version control)
- [ ] Code editor installed (VS Code, Sublime, etc.)

## 🔧 Backend Setup Checklist

- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Add MongoDB connection string to `MONGO_URI`
- [ ] Generate and add JWT secret to `JWT_SECRET` (min 32 characters)
- [ ] Add OpenAI API key to `OPENAI_API_KEY`
- [ ] Verify MongoDB is running (local) or accessible (Atlas)
- [ ] Test backend startup with `npm run dev`
- [ ] Verify "Server running on port 5000" message appears
- [ ] Check MongoDB connection success message

## 🎨 Frontend Setup Checklist

- [ ] Navigate to `frontend` directory
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Set `VITE_API_URL=http://localhost:5000` in `.env`
- [ ] Test frontend startup with `npm run dev`
- [ ] Verify "Local: http://localhost:3000" message appears
- [ ] Open browser to `http://localhost:3000`
- [ ] Verify login page loads correctly

## ✨ Feature Testing Checklist

### Authentication

- [ ] Sign up with new user (username, email, password)
- [ ] Verify signup success message
- [ ] Login with created credentials
- [ ] Verify redirect to dashboard
- [ ] Check JWT token stored in localStorage
- [ ] Verify protected routes work (Dashboard, Profile)
- [ ] Test logout functionality
- [ ] Verify redirect to login after logout

### Content Generation

- [ ] Navigate to dashboard
- [ ] Enter a prompt (e.g., "5 tips for productivity")
- [ ] Select tone (formal/casual/professional)
- [ ] Select length (short/medium/long)
- [ ] Click "Generate" button
- [ ] Verify loading state appears
- [ ] Wait for AI-generated content
- [ ] Check content appears in history below
- [ ] Verify content is saved to database

### Content Summarization

- [ ] Paste text into summarization input
- [ ] Select format (paragraph/bullets)
- [ ] Click "Summarize" button
- [ ] Verify summary is generated
- [ ] Check summary appears in history
- [ ] Test URL summarization (optional)
- [ ] Verify summarized content is saved

### Content Management

- [ ] Click "Edit" on a content card
- [ ] Modify the text
- [ ] Click "Save"
- [ ] Verify content is updated
- [ ] Click "Copy" button
- [ ] Verify clipboard notification
- [ ] Paste to verify content copied
- [ ] Click "Export PDF"
- [ ] Verify PDF downloads
- [ ] Open PDF and check content
- [ ] Click "Delete" button
- [ ] Confirm deletion
- [ ] Verify content is removed

### Search & Filter

- [ ] Use search box to find content
- [ ] Type keyword and verify filtering works
- [ ] Use type filter (Generated/Summarized)
- [ ] Verify only matching types show
- [ ] Use date filter
- [ ] Verify content filtered by date
- [ ] Clear filters
- [ ] Verify all content shows again

### Profile Page

- [ ] Navigate to Profile
- [ ] Verify username displays correctly
- [ ] Verify email displays correctly
- [ ] Check usage statistics show counts
- [ ] Click "Export Stats as PDF"
- [ ] Verify PDF downloads with statistics
- [ ] Click "Go to Dashboard"
- [ ] Verify navigation works
- [ ] Click "Logout"
- [ ] Verify logout successful

### Dark Mode

- [ ] Click dark mode toggle button
- [ ] Verify theme switches to dark
- [ ] Check all pages in dark mode
- [ ] Toggle back to light mode
- [ ] Verify theme switches to light
- [ ] Refresh page
- [ ] Verify theme preference persists

### Navigation

- [ ] Click navbar "Dashboard" link
- [ ] Verify navigation to dashboard
- [ ] Click navbar "Profile" link
- [ ] Verify navigation to profile
- [ ] Click navbar "Logout" button
- [ ] Verify logout and redirect to login

### Responsive Design

- [ ] Resize browser to mobile width
- [ ] Verify layout adjusts properly
- [ ] Test all features on mobile view
- [ ] Resize to tablet width
- [ ] Verify layout adjusts for tablet
- [ ] Return to desktop width
- [ ] Verify desktop layout restored

## 🧪 Testing Checklist

### Backend Tests

- [ ] Navigate to `backend` directory
- [ ] Run `npm test`
- [ ] Verify all auth tests pass
- [ ] Verify all content tests pass
- [ ] Check test coverage report

### Frontend Tests

- [ ] Navigate to `frontend` directory
- [ ] Run `npm test`
- [ ] Verify LoginPage tests pass
- [ ] Verify ContentCard tests pass

## 🌐 Deployment Checklist (Optional)

### MongoDB Atlas

- [ ] Create MongoDB Atlas cluster
- [ ] Configure database user
- [ ] Whitelist IP addresses
- [ ] Get connection string
- [ ] Test connection from local

### Backend Deployment

- [ ] Choose hosting (Render/Heroku)
- [ ] Create account and new service
- [ ] Connect GitHub repository
- [ ] Configure build commands
- [ ] Add environment variables
- [ ] Deploy backend
- [ ] Test API endpoints
- [ ] Copy backend URL

### Frontend Deployment

- [ ] Choose hosting (Vercel/Netlify)
- [ ] Create account and new site
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Add VITE_API_URL with backend URL
- [ ] Deploy frontend
- [ ] Test deployed application
- [ ] Verify all features work in production

## 🔒 Security Checklist

- [ ] JWT_SECRET is at least 32 characters long
- [ ] JWT_SECRET is random and unique
- [ ] OpenAI API key is valid and has credits
- [ ] MongoDB connection uses authentication
- [ ] .env files are in .gitignore
- [ ] No secrets committed to Git
- [ ] CORS configured for production domains
- [ ] HTTPS enabled in production
- [ ] Password requirements enforced
- [ ] Input validation on all forms

## 📚 Documentation Checklist

- [ ] Read README.md
- [ ] Review QUICKSTART.md
- [ ] Check DOCUMENTATION.md for API details
- [ ] Read DEPLOYMENT.md for production setup
- [ ] Review PROJECT_SUMMARY.md

## 🐛 Troubleshooting Checklist

If something doesn't work:

- [ ] Check backend terminal for errors
- [ ] Check frontend terminal for errors
- [ ] Check browser console for errors
- [ ] Verify .env files are configured correctly
- [ ] Verify MongoDB is running/accessible
- [ ] Verify OpenAI API key is valid
- [ ] Check network tab in browser DevTools
- [ ] Clear browser cache and localStorage
- [ ] Restart both servers
- [ ] Check firewall settings
- [ ] Verify port 5000 and 3000 are available

## ✅ Final Verification

- [ ] Application runs without errors
- [ ] All core features work
- [ ] All bonus features work
- [ ] UI is responsive on all screen sizes
- [ ] Dark mode works correctly
- [ ] PDF exports work
- [ ] Search and filter work
- [ ] Authentication is secure
- [ ] Tests pass successfully
- [ ] Documentation is clear and helpful

## 🎉 Ready to Use!

If all items are checked, your ContentIQ application is ready for use!

---

**Need Help?**

- Check QUICKSTART.md for common issues
- Review DOCUMENTATION.md for detailed info
- Check backend/frontend logs for errors
- Verify all environment variables are set correctly

**Happy Content Creating! 🚀**
