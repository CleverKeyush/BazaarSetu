#!/bin/bash

# BazaarSetu Deployment Script
echo "🚀 Starting BazaarSetu Deployment..."

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Render: https://render.com"
echo "2. Deploy frontend to Vercel: https://vercel.com"
echo "3. Update environment variables"
echo ""
echo "Backend URL: https://bazaarsetu-backend.onrender.com"
echo "Frontend URL: https://bazaarsetu.vercel.app"