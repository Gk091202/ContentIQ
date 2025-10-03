# ContentIQ - AI-Powered Content Generator & Summarizer

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)

> A full-stack MERN application that leverages OpenAI GPT-4 to generate high-quality content and summarize articles with a modern, responsive UI.

## ✨ Features

### 🔐 Authentication

- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware

### 🤖 AI Integration

- **Content Generation**: Create blogs, posts, essays with customizable tone (formal/casual/professional) and length (short/medium/long)
- **Content Summarization**: Summarize text or URLs in paragraph or bullet format
- Powered by OpenAI GPT-4 API

### 📊 Dashboard

- Interactive content generation interface
- Real-time AI processing
- Content history with search and filters
- CRUD operations (Create, Read, Update, Delete)

### 👤 User Profile

- View account information
- Usage statistics tracking
- Export stats as PDF

### 🎨 UI/UX

- Fully responsive design (mobile, tablet, desktop)
- Dark/light mode toggle
- Modern Tailwind CSS styling
- Smooth transitions and animations

### 📄 Export Features

- Export individual content as PDF
- Export usage statistics as PDF
- Copy content to clipboard

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/ContentIQ.git
cd ContentIQ

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and OpenAI API key
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

Visit `http://localhost:3000` and start creating!

📖 **Full Setup Guide**: See [QUICKSTART.md](./QUICKSTART.md)

## 📁 Project Structure

```
ContentIQ/
├── backend/              # Express.js backend
│   ├── models/          # MongoDB schemas (User, Content)
│   ├── routes/          # API routes (auth, content)
│   ├── middleware/      # JWT authentication
│   ├── services/        # OpenAI integration
│   ├── tests/           # Jest unit tests
│   └── server.js        # Entry point
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── tests/       # Component tests
│   ├── index.html
│   └── vite.config.js
├── DOCUMENTATION.md     # Full documentation
├── DEPLOYMENT.md        # Deployment guide
└── QUICKSTART.md        # Quick start guide
```

## 🛠️ Tech Stack

**Frontend:**

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios
- jsPDF

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- OpenAI API
- Jest + Supertest

## 📚 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Get up and running in 5 minutes
- **[Full Documentation](./DOCUMENTATION.md)** - Complete API docs and features
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production (Render, Vercel, Heroku)

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🌐 Deployment

Deploy to production with:

- **Backend**: Render or Heroku
- **Frontend**: Vercel or Netlify
- **Database**: MongoDB Atlas

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user profile (protected)

### Content

- `POST /api/content/generate` - Generate AI content (protected)
- `POST /api/content/summarize` - Summarize text/URL (protected)
- `GET /api/content/history` - Get user content (protected)
- `PUT /api/content/:id` - Update content (protected)
- `DELETE /api/content/:id` - Delete content (protected)

## 🔒 Environment Variables

**Backend (.env):**

```env
MONGO_URI=mongodb://localhost:27017/contentiq
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=sk-your-openai-key
PORT=5000
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created by [Your Name]

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- MongoDB Atlas
- Tailwind CSS
- The React community

---

**⭐ Star this repo if you find it helpful!**
