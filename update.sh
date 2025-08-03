#!/bin/bash

echo "Starting NextProperty update process..."

# Navigate to project directory
cd "$(dirname "$0")"

# Pull latest changes
echo "Pulling latest changes from git..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm run install-all

# Build the application
echo "Building the application..."
npm run build-all

# Restart PM2 process
echo "Restarting PM2 process..."
pm2 restart nextproperty

echo "Update completed successfully!"
echo "Check status with: pm2 status" 