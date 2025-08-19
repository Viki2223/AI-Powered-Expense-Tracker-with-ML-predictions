#!/bin/bash
echo "🏗️ Building AI Expense Tracker for production..."

# Install backend dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Build frontend
echo "🎨 Building React frontend..."
cd frontend
npm ci
npm run build
cd ..

# Copy built frontend to backend static folder
echo "�� Preparing static files..."
mkdir -p backend/static
cp -r frontend/build/* backend/static/

echo "✅ Build completed successfully!"
