# Blog Application Frontend - Deployment Guide

## Deployment Readiness Checklist

### ✅ Verified Components

#### 1. Environment Variables
- [x] VITE_API_BASE_URL is properly configured
- [x] Environment variables use VITE_ prefix for client-side exposure
- [x] Fallback to localhost for development is in place
- [x] .env file is in .gitignore (security best practice)
- [x] .env.example template provided with comprehensive documentation

#### 2. API Configuration
- [x] Axios baseURL configured dynamically from environment variables
- [x] No hardcoded localhost URLs in application code
- [x] JWT token injection via request interceptor is configured
- [x] Axios instance properly exports all endpoints

#### 3. State Persistence
- [x] localStorage used for authentication tokens and user data
- [x] localStorage used for theme preferences
- [x] Graceful error handling for localStorage access
- [x] User data sanitized before storage (sensitive fields removed)

#### 4. React Router Configuration
- [x] React Router v7 properly initialized with BrowserRouter
- [x] Protected routes implemented via ProtectedRoute component
- [x] 404 fallback route redirects to home
- [x] Vercel rewrites configured in vercel.json for SPA routing

#### 5. Build Process
- [x] npm run build completes successfully
- [x] Vite production build generates optimized output to dist/
- [x] No build errors or critical warnings
- [x] All dependencies properly declared in package.json

#### 6. Vercel Configuration
- [x] vercel.json created with proper rewrites for React Router
- [x] Output directory set to dist/
- [x] Build and dev commands configured
- [x] Environment variable placeholder added

---

## Deployment Steps

### Prerequisites
- Backend API deployed and running
- Vercel account connected to GitHub repository

### Step 1: Prepare for Deployment

1. **Configure Environment**
   ```bash
   # Copy template to actual .env.example (already done)
   # In production, use Vercel Environment Variables
   ```

2. **Verify Build**
   ```bash
   npm run build
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Vite project

2. **Configure Build Settings**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url/api/v1`
   - Example: `https://blog-api.railway.app/api/v1`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Check build logs if any issues occur

### Step 3: Verify Deployment

1. **Test Application**
   - Visit deployed URL
   - Test login/register
   - Test creating and editing blogs
   - Verify theme toggle persists across sessions
   - Check browser DevTools → Application → LocalStorage

2. **Check API Connectivity**
   - Open browser DevTools → Network tab
   - Perform an action that calls the API
   - Verify API requests go to configured backend URL
   - Check for CORS errors

3. **Test Protected Routes**
   - Try accessing `/blogs` without logging in
   - Should redirect to `/login`
   - After login, should access all protected routes

---

## Environment Variables Reference

### VITE_API_BASE_URL (Required)
**Purpose**: Backend API base URL for all API requests

**Format**: `https://domain.com/api/v1`

**Examples**:
- Local: `http://localhost:4000/api/v1`
- Railway: `https://blog-api-prod.railway.app/api/v1`
- Custom Domain: `https://api.myblog.com/api/v1`

---

## API Integration Details

### Axios Configuration
- Base URL: Dynamically set from `VITE_API_BASE_URL`
- Default Headers: `Content-Type: application/json`
- Request Interceptor: Automatically adds JWT Bearer token from localStorage
- Response Handling: Sanitizes user data (removes sensitive fields)

### Authentication Flow
1. User logs in → Token stored in localStorage
2. Subsequent requests → Token automatically added to Authorization header
3. Token retrieved on app mount → Redux state restored
4. Logout → Token and user data cleared from localStorage

### CORS Considerations
- Backend must allow requests from your Vercel domain
- Add Vercel deployment URL to CORS whitelist in backend
- Example: `https://your-app.vercel.app`

---

## Troubleshooting

### API Requests Failing After Deployment

**Problem**: API calls return 404 or network errors
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check backend API is running and accessible
- Verify CORS headers include your frontend domain
- Check browser Network tab for actual API URL being called

**Solution**:
```bash
# In Vercel Project Settings → Environment Variables
# Ensure VITE_API_BASE_URL points to correct backend
VITE_API_BASE_URL=https://your-backend-url/api/v1
# Then redeploy
```

### Routes Not Working (404 on Refresh)

**Problem**: Refreshing non-root routes shows 404
- This is resolved by vercel.json rewrites

**Verification**: 
- Ensure vercel.json exists in project root
- Check it contains proper rewrites section
- Redeploy after adding vercel.json

### LocalStorage Not Persisting

**Problem**: User gets logged out after page refresh
- Browser might have localStorage disabled
- Check browser DevTools → Application → Storage

**Solution**: 
- Ensure user is in non-private/incognito mode
- Check browser privacy settings allow storage
- Verify Redux slices properly hydrate from localStorage on mount

### Chunk Size Warning

**Info**: Build shows chunk size warnings
- Not critical for deployment
- Optional optimization: Implement code splitting with dynamic imports
- Current build size acceptable for most deployments

---

## Security Best Practices

✅ **Implemented**:
- `.env` file not tracked in git
- Environment variables templated in `.env.example`
- JWT tokens stored securely in localStorage (domain-scoped)
- User data sanitized before storage
- CORS requests validated by backend
- No sensitive data in client bundle

⚠️ **Remember**:
- Never commit `.env` file to repository
- Only add environment variables in Vercel dashboard
- Backend must validate all requests (don't trust client)
- Keep JWT secret secure on backend
- Rotate credentials if ever exposed

---

## Performance Optimization (Optional)

The current build has some large chunks. For future optimization:

1. **Code Splitting**: Use dynamic imports for routes
2. **Bundle Analysis**: Use `npm install -D rollup-plugin-visualizer`
3. **Asset Optimization**: Images and CSS are already optimized by Vite

---

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel React Documentation](https://vercel.com/docs/frameworks/react)
- [React Router v7 Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

## Support

For deployment issues:
1. Check Vercel build logs for compilation errors
2. Check browser DevTools for API/network errors
3. Verify environment variables are set correctly
4. Ensure backend API is accessible and CORS configured
