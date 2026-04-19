# Deployment Guide: E-commerce Application

This guide walks you through deploying the full-stack e-commerce application to MongoDB Atlas, Vercel (frontend), and Render (backend).

## Prerequisites

1. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
2. **Vercel Account** - [Sign up here](https://vercel.com/signup)
3. **Render Account** - [Sign up here](https://render.com/signup)
4. **GitHub Account** (optional but recommended)

## Pre-configured MongoDB Cluster (Optional)

A MongoDB Atlas cluster is already set up for this project. The connection string is pre‑configured in `backend/.env.production`:

```
mongodb+srv://apexprit9:APEXPRIT@cluster0.jjbik9f.mongodb.net/ecommerce?appName=Cluster0
```

You can use this cluster directly, or if you prefer to set up your own cluster, follow the steps below.

## Step 1: MongoDB Atlas Setup

### 1.1 Create a Cluster
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Build a Database"
3. Choose the FREE tier (M0 Sandbox)
4. Select your preferred cloud provider and region
5. Click "Create Cluster"

### 1.2 Configure Database Access
1. Navigate to "Database Access" under Security
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set database user privileges to "Read and write to any database"
6. Click "Add User"

### 1.3 Configure Network Access
1. Navigate to "Network Access" under Security
2. Click "Add IP Address"
3. For production, add `0.0.0.0/0` to allow access from anywhere
   - **Warning**: This allows any IP to connect. For better security, restrict to Render's IP ranges.
4. Click "Confirm"

### 1.4 Get Connection String
1. Go to "Database" > "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" driver and version 4.1 or later
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `ecommerce`

Example connection string (pre‑configured cluster):
```
mongodb+srv://apexprit9:APEXPRIT@cluster0.jjbik9f.mongodb.net/ecommerce?appName=Cluster0
```

If you created your own cluster, your connection string will look similar but with your own credentials.

## Step 2: Backend Deployment to Render

### 2.1 Prepare Backend Repository
1. Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Verify the following files exist in your repository:
   - `backend/package.json`
   - `backend/server.js`
   - `render.yaml` (optional but recommended)

### 2.2 Deploy to Render
#### Option A: Using Render Blueprint (recommended)
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Blueprint"
3. Connect your Git repository
4. Render will automatically detect the `render.yaml` file
5. Review the services and click "Apply"
6. Set environment variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong random string
   - `FRONTEND_URL`: Your Vercel frontend URL (set after frontend deployment)
   - `CORS_ORIGIN`: Same as FRONTEND_URL

#### Option B: Manual Web Service Setup
1. Log in to Render Dashboard
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `ecommerce-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free
5. Add environment variables as above
6. Click "Create Web Service"

### 2.3 Get Backend URL
After deployment, Render will provide a URL like:
```
https://ecommerce-backend.onrender.com
```

## Step 3: Frontend Deployment to Vercel

### 3.1 Update API Configuration
1. Update `frontend/.env.production` with your Render backend URL:
   ```
   VITE_API_URL=https://ecommerce-backend.onrender.com/api
   ```

### 3.2 Deploy to Vercel
#### Option A: Using Vercel CLI (local deployment)
```bash
npm install -g vercel
cd frontend
vercel
```

#### Option B: Using Vercel Dashboard (recommended)
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." > "Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   - `VITE_API_URL`: `https://ecommerce-backend.onrender.com/api`
6. Click "Deploy"

### 3.3 Get Frontend URL
After deployment, Vercel will provide a URL like:
```
https://ecommerce-frontend.vercel.app
```

## Step 4: Update Configuration

### 4.1 Update Backend CORS
1. Go to your Render backend service dashboard
2. Navigate to "Environment" tab
3. Update the following variables:
   - `FRONTEND_URL`: `https://ecommerce-frontend.vercel.app`
   - `CORS_ORIGIN`: `https://ecommerce-frontend.vercel.app`
4. Redeploy the service

### 4.2 Update Frontend API URL
1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Update `VITE_API_URL` to match your backend URL
4. Redeploy the frontend

## Step 5: Verify Deployment

### 5.1 Test Backend Health Check
```
curl https://ecommerce-backend.onrender.com/health
```
Expected response: `{"status":"OK","timestamp":"..."}`

### 5.2 Test Frontend-Backend Connection
1. Open your frontend URL in browser
2. Check browser console for any CORS errors
3. Test authentication flows

## Environment Variables Reference

### Backend (.env.production)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://apexprit9:APEXPRIT@cluster0.jjbik9f.mongodb.net/ecommerce?appName=Cluster0
JWT_SECRET=your-strong-secret-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://ecommerce-frontend.vercel.app
CORS_ORIGIN=https://ecommerce-frontend.vercel.app
```

### Frontend (.env.production)
```
VITE_API_URL=https://ecommerce-backend.onrender.com/api
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Verify network access includes Render's IP ranges (or allow access from anywhere `0.0.0.0/0` in MongoDB Atlas Network Access)
   - Check username/password in connection string
   - Ensure database name is correct
   - For the pre‑configured cluster, ensure your IP is allowed (if not, you may need to configure network access in MongoDB Atlas dashboard)
   - If you see `querySrv ECONNREFUSED`, check your internet connectivity and DNS settings

2. **CORS Errors**
   - Verify `FRONTEND_URL` and `CORS_ORIGIN` match exactly
   - Check backend CORS configuration in `server.js`

3. **Render Service Fails to Start**
   - Check build logs for npm install errors
   - Verify `package.json` has correct start script
   - Ensure PORT is set to 5000

4. **Vercel Build Fails**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check build output for specific errors

## Maintenance

### Database Backups
1. MongoDB Atlas provides automatic backups for paid tiers
2. For free tier, consider manual exports:
   ```bash
   mongodump --uri="your-connection-string"
   ```

### Monitoring
1. **Render**: View logs in service dashboard
2. **Vercel**: Check analytics and function logs
3. **MongoDB Atlas**: Monitor cluster metrics in dashboard

### Scaling
1. Upgrade Render plan for more resources
2. Consider MongoDB Atlas paid tiers for better performance
3. Implement caching with Redis (optional)

## Security Notes

1. **Never commit sensitive data** to Git repositories
2. Use environment variables for all secrets
3. Regularly rotate JWT secrets
4. Implement rate limiting (already configured in backend)
5. Consider adding HTTPS redirects and security headers

## Support

For issues with:
- **MongoDB Atlas**: Contact [MongoDB Support](https://support.mongodb.com)
- **Render**: Visit [Render Community](https://community.render.com)
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)

---

**Deployment Complete!** Your e-commerce application is now live and accessible to users.