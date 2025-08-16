#!/bin/bash

# Deploy script for GitHub Pages
# This script builds the project and prepares it for deployment

echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🌐 To deploy to GitHub Pages:"
    echo "1. Push your changes to the main branch"
    echo "2. GitHub Actions will automatically deploy to gh-pages branch"
    echo "3. Or manually copy the 'dist' folder contents to your web server"
    echo ""
    echo "📋 Build summary:"
    echo "- HTML files: dist/*.html"
    echo "- CSS files: dist/css/"
    echo "- JavaScript files: dist/js/"
    echo "- Assets: dist/assets/"
    echo "- Configuration: dist/data.json, dist/environment.js"
else
    echo "❌ Build failed!"
    exit 1
fi
