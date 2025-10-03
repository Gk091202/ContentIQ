# ContentIQ - AI-Powered Content Generator & Summarizer

![ContentIQ](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A full-stack MERN application that leverages AI to generate high-quality content and summarize articles. Built with MongoDB, Express.js, React, and Node.js, integrated with OpenAI GPT-4 for intelligent content processing.

## 🚀 Features

### Core Features

- **User Authentication**: Secure signup/login with JWT-based authentication and password hashing
- **AI Content Generation**: Generate blogs, social media posts, and essays with customizable tone and length
- **AI Content Summarization**: Summarize text or article URLs in paragraph or bullet point format
- **Content Management**: Save, edit, delete, and copy generated/summarized content
- **Search & Filter**: Search by keyword, filter by type (generated/summarized) and date
- **Responsive Design**: Fully responsive UI built with React and Tailwind CSS

### Bonus Features

- **User Profile**: View account info and usage statistics
- **Dark Mode**: Toggle between light and dark themes
- **PDF Export**: Export content and statistics as PDF files
- **Protected Routes**: Secure dashboard and profile pages
- **Unit Tests**: Comprehensive tests for backend routes and React components

## 📁 Project Structure

```
ContentIQ/
├── backend/
│   ├── models/
│   │   ├── User.js           # User schema with authentication
│   │   └── Content.js         # Content schema for generated/summarized content
│   ├── routes/
│   │   ├── auth.js            # Authentication routes (signup, login)
│   │   └── content.js         # Content CRUD routes
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── services/
│   │   └── ai.js              # OpenAI GPT-4 integration
│   ├── tests/
│   │   ├── auth.test.js       # Auth route unit tests
│   │   └── content.test.js    # Content route unit tests
│   ├── server.js              # Express server configuration
│   ├── package.json           # Backend dependencies
│   ├── jest.config.js         # Jest test configuration
│   └── .env.example           # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentCard.jsx      # Content display card with CRUD actions
│   │   │   ├── DarkModeToggle.jsx   # Dark/light mode switcher
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx        # Login page
│   │   │   ├── SignupPage.jsx       # Signup page
│   │   │   ├── DashboardPage.jsx    # Main dashboard
│   │   │   └── ProfilePage.jsx      # User profile with stats
│   │   ├── tests/
│   │   │   ├── LoginPage.test.jsx   # Login page tests
│   │   │   └── ContentCard.test.jsx # ContentCard tests
│   │   ├── App.jsx            # Main app component with routing
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Tailwind CSS imports
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── .env.example           # Frontend environment variables
└── README.md                  # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ContentIQ.git
cd ContentIQ
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your credentials
# MONGO_URI=mongodb://localhost:27017/contentiq
# JWT_SECRET=your_super_secret_jwt_key_here
# OPENAI_API_KEY=sk-your-openai-api-key-here
# PORT=5000

# Start development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
# VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📝 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`

Create a new user account

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### POST `/api/auth/login`

Login with existing credentials

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Returns: `{ token: "jwt_token", user: { username, email } }`

#### GET `/api/auth/me`

Get user profile and stats (Protected)
Headers: `Authorization: Bearer <token>`

### Content Endpoints

#### POST `/api/content/generate` (Protected)

Generate AI content

```json
{
  "prompt": "Write about AI in healthcare",
  "tone": "professional",
  "length": "medium"
}
```

- **tone**: formal, casual, professional
- **length**: short, medium, long

#### POST `/api/content/summarize` (Protected)

Summarize content

```json
{
  "inputText": "Long article text here...",
  "url": "https://example.com/article",
  "format": "bullets"
}
```

- **format**: paragraph, bullets
- Either `inputText` or `url` required

#### GET `/api/content/history` (Protected)

Get user's content history
Query params:

- `search`: keyword search
- `type`: generated or summarized
- `startDate`: filter by date
- `endDate`: filter by date

#### PUT `/api/content/:id` (Protected)

Update content

```json
{
  "outputText": "Updated content text"
}
```

#### DELETE `/api/content/:id` (Protected)

Delete content

## 🎨 UI Features

### Dashboard

- **Content Generator**: Create AI-generated content with customizable options
- **Content Summarizer**: Paste text or URLs to get concise summaries
- **History View**: Browse all your generated and summarized content
- **Search & Filter**: Find specific content quickly

### Profile Page

- View account information
- See usage statistics (generated/summarized counts)
- Export statistics as PDF
- Logout functionality

### Content Cards

- Edit content inline
- Copy to clipboard
- Export individual content as PDF
- Delete content

## 🌐 Deployment

### Backend Deployment (Render/Heroku)

#### Using Render

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables: `MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY`

#### Using Heroku

```bash
cd backend
heroku create contentiq-backend
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

#### Using Vercel

```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts and set VITE_API_URL environment variable
```

#### Using Netlify

1. Create account on [Netlify](https://netlify.com)
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variable: `VITE_API_URL=your_backend_url`

## 🔒 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/contentiq
JWT_SECRET=your_very_secure_secret_key_min_32_characters
OPENAI_API_KEY=sk-your-openai-api-key-here
PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
# For production: https://your-backend-url.com
```

## 🧩 Technology Stack

### Backend

- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **OpenAI API**: AI content generation
- **Jest & Supertest**: Testing framework

### Frontend

- **React 18**: UI library
- **React Router**: Navigation
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Axios**: HTTP client
- **jsPDF**: PDF generation

## 📊 Sample Usage

### Generate Content Example

```javascript
// Request
POST /api/content/generate
{
  "prompt": "5 tips for healthy living",
  "tone": "casual",
  "length": "short"
}

// Response
{
  "_id": "...",
  "type": "generated",
  "prompt": "5 tips for healthy living",
  "outputText": "Here are 5 easy tips...",
  "tone": "casual",
  "length": "short",
  "createdAt": "2025-10-04T..."
}
```

### Summarize Content Example

```javascript
// Request
POST /api/content/summarize
{
  "inputText": "Long article about climate change...",
  "format": "bullets"
}

// Response
{
  "_id": "...",
  "type": "summarized",
  "inputText": "Long article...",
  "outputText": "• Key point 1\n• Key point 2...",
  "format": "bullets",
  "createdAt": "2025-10-04T..."
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- MongoDB Atlas for database hosting
- Tailwind CSS for styling framework
- React community for amazing tools

---

**Note**: Replace API keys and secrets in production. Never commit `.env` files to version control.
