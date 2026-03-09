#!/bin/bash

# GreenROI Widget Setup Script

echo "🚀 GreenROI Widget Setup"
echo "======================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✓ Node.js detected: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Create .env.local
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Add your Firebase configuration here
# See .env.example for required variables

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
EOF
    echo "✓ .env.local created - Please add your Firebase credentials"
    echo ""
else
    echo "✓ .env.local already exists"
    echo ""
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Firebase credentials to .env.local"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:5173"
echo ""
echo "To embed in a website:"
echo "  npm run build:widget"
echo "  This creates an embeddable script that can be included in any website"
echo ""
