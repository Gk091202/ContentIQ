#!/bin/bash

# ContentIQ Setup Script
# This script helps you set up ContentIQ quickly

echo "🚀 ContentIQ Setup Script"
echo "=========================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js installation
echo "📦 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16+ first.${NC}"
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm ${NPM_VERSION} found${NC}"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your:${NC}"
    echo "   - MongoDB URI"
    echo "   - JWT Secret (min 32 characters)"
    echo "   - OpenAI API Key"
    echo ""
fi

echo "📦 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Frontend setup
echo "🎨 Setting up Frontend..."
cd frontend

if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit frontend/.env with your backend URL${NC}"
    echo "   Default: VITE_API_URL=http://localhost:5000"
    echo ""
fi

echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..
echo ""

# Summary
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure your environment variables:"
echo "   ${YELLOW}backend/.env${NC} - Add MongoDB URI, JWT secret, OpenAI API key"
echo "   ${YELLOW}frontend/.env${NC} - Verify API URL (default: http://localhost:5000)"
echo ""
echo "2. Start the backend (in one terminal):"
echo "   ${GREEN}cd backend && npm run dev${NC}"
echo ""
echo "3. Start the frontend (in another terminal):"
echo "   ${GREEN}cd frontend && npm run dev${NC}"
echo ""
echo "4. Open your browser:"
echo "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: ./QUICKSTART.md"
echo "   - Full Docs: ./DOCUMENTATION.md"
echo "   - Deployment: ./DEPLOYMENT.md"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
