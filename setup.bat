@echo off
REM GreenROI Widget Setup Script for Windows

echo 🚀 GreenROI Widget Setup
echo =======================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js detected: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local file...
    (
        echo # Add your Firebase configuration here
        echo # See .env.example for required variables
        echo.
        echo VITE_FIREBASE_API_KEY=
        echo VITE_FIREBASE_AUTH_DOMAIN=
        echo VITE_FIREBASE_PROJECT_ID=
        echo VITE_FIREBASE_STORAGE_BUCKET=
        echo VITE_FIREBASE_MESSAGING_SENDER_ID=
        echo VITE_FIREBASE_APP_ID=
    ) > .env.local
    echo ✓ .env.local created - Please add your Firebase credentials
    echo.
) else (
    echo ✓ .env.local already exists
    echo.
)

echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Add your Firebase credentials to .env.local
echo 2. Run 'npm run dev' to start the development server
echo 3. Visit http://localhost:5173
echo.
echo To embed in a website:
echo   npm run build:widget
echo   This creates an embeddable script that can be included in any website
echo.
pause
