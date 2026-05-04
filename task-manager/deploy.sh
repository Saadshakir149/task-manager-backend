#!/bin/bash

echo "Starting deployment process..."

echo "Deploying backend to Render..."
cd backend || exit

git add .
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "Deploy backend"
git push origin main

echo "Deploying frontend to Vercel..."
cd ../frontend || exit
npm run build
vercel --prod

echo "Deployment complete!"
echo "Update frontend .env VITE_API_URL to your backend URL"
