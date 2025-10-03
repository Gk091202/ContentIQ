@echo off
REM ContentIQ Setup Script for Windows
REM This script helps you set up ContentIQ quickly

echo ================================
echo ContentIQ Setup Script
echo ================================
echo.

REM Check Node.js installation
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v16+ first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Check npm installation
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% found
echo.

REM Backend setup
echo Setting up Backend...
cd backend

if not exist ".env" (
    echo Creating backend .env file...
    copy .env.example .env
    echo [WARNING] Please edit backend\.env with your:
    echo    - MongoDB URI
    echo    - JWT Secret (min 32 characters)
    echo    - OpenAI API Key
    echo.
)

echo Installing backend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

echo [OK] Backend dependencies installed
cd ..
echo.

REM Frontend setup
echo Setting up Frontend...
cd frontend

if not exist ".env" (
    echo Creating frontend .env file...
    copy .env.example .env
    echo [WARNING] Please edit frontend\.env with your backend URL
    echo    Default: VITE_API_URL=http://localhost:5000
    echo.
)

echo Installing frontend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo [OK] Frontend dependencies installed
cd ..
echo.

REM Summary
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next Steps:
echo.
echo 1. Configure your environment variables:
echo    backend\.env - Add MongoDB URI, JWT secret, OpenAI API key
echo    frontend\.env - Verify API URL (default: http://localhost:5000)
echo.
echo 2. Start the backend (in one terminal):
echo    cd backend ^&^& npm run dev
echo.
echo 3. Start the frontend (in another terminal):
echo    cd frontend ^&^& npm run dev
echo.
echo 4. Open your browser:
echo    http://localhost:3000
echo.
echo Documentation:
echo    - Quick Start: QUICKSTART.md
echo    - Full Docs: DOCUMENTATION.md
echo    - Deployment: DEPLOYMENT.md
echo.
echo Happy coding!
echo.
pause
