# 🚀 BazaarSetu Deployment Guide

## Overview
This guide covers deploying BazaarSetu to production with:
- **Frontend**: Vercel/Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas (recommended)

## 📋 Pre-Deployment Checklist

### Backend Preparation
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] CORS settings updated for production
- [ ] Health check endpoint working

### Frontend Preparation
- [ ] API URLs updated for production
- [ ] Build process tested locally
- [ ] Environment variables configured
- [ ] Static assets optimized

## 🔧 Backend Deployment (Render)

### 1. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Connect your repository

### 2. Deploy Backend
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Configure settings:
   - **Name**: `bazaarsetu-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (for testing)

### 3. Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bazaarsetu
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-chars
FRONTEND_URL=https://bazaarsetu.vercel.app
```

### 4. Custom Domain (Optional)
- Add custom domain in Render settings
- Update DNS records as instructed

## 🌐 Frontend Deployment (Vercel)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy to Vercel
```bash
# In the marketplace-app directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: bazaarsetu
# - Directory: ./
# - Override settings? No
```

### 3. Environment Variables
Add in Vercel dashboard:
```
REACT_APP_API_URL=https://bazaarsetu-backend.onrender.com
REACT_APP_NODE_ENV=production
```

### 4. Custom Domain (Optional)
- Add domain in Vercel dashboard
- Configure DNS records

## 🌐 Alternative: Netlify Deployment

### 1. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### 2. Environment Variables
Add in Netlify dashboard:
```
REACT_APP_API_URL=https://bazaarsetu-backend.onrender.com
REACT_APP_NODE_ENV=production
```

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for development)

### 2. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

## 🔐 Security Configuration

### Backend Security
- [ ] CORS configured for production domains
- [ ] Rate limiting enabled
- [ ] JWT secrets are secure (32+ characters)
- [ ] Environment variables not exposed
- [ ] HTTPS enforced

### Frontend Security
- [ ] API keys not exposed in client code
- [ ] Build artifacts don't contain sensitive data
- [ ] CSP headers configured (if needed)

## 🧪 Testing Deployment

### 1. Backend Health Check
```bash
curl https://bazaarsetu-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T...",
  "uptime": 123.45
}
```

### 2. Frontend Functionality
- [ ] Home page loads correctly
- [ ] User registration works
- [ ] Login functionality works
- [ ] Maps display properly
- [ ] API calls succeed

### 3. Integration Testing
- [ ] Frontend can communicate with backend
- [ ] Authentication flow works end-to-end
- [ ] All features functional

## 📊 Monitoring & Maintenance

### Backend Monitoring
- Monitor Render dashboard for uptime
- Check logs for errors
- Monitor database connections

### Frontend Monitoring
- Monitor Vercel/Netlify analytics
- Check for build failures
- Monitor Core Web Vitals

## 🚨 Troubleshooting

### Common Issues

#### CORS Errors
- Verify FRONTEND_URL environment variable
- Check CORS configuration in server.js

#### API Connection Issues
- Verify REACT_APP_API_URL is correct
- Check backend deployment status
- Verify environment variables

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for syntax errors

## 📞 Support

For deployment issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check CORS configuration

## 🎉 Success!

Once deployed successfully, your BazaarSetu application will be available at:
- **Frontend**: https://bazaarsetu.vercel.app
- **Backend**: https://bazaarsetu-backend.onrender.com

The application includes:
- ✅ Street food vendor marketplace
- ✅ Interactive maps with 37+ vendors
- ✅ User authentication system
- ✅ Spending tracker for vendors
- ✅ Multi-language support
- ✅ Mobile-responsive design
- ✅ Real-time mandi prices
- ✅ Group ordering system