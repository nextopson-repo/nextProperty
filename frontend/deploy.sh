#!/bin/bash

# NextProperty Frontend Deployment Script for EC2
# This script builds and serves the frontend application

echo "🚀 Starting NextProperty Frontend Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building for production..."
npm run build:prod

echo "✅ Build completed successfully!"

echo "🌐 Starting production server..."
echo "📱 Frontend will be available at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "🔗 Or use your EC2 public IP address"

# Start the production server
npm run start 