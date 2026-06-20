# Backend URL Configuration Reference

## For Developers & DevOps

Quick reference for setting up the backend API URL during deployment.

---

## Environment Variable: VITE_API_BASE_URL

### What It Does
- Tells the frontend application where the backend API is located
- Used by Axios for all API requests
- Must be set correctly for production deployment

### Format
```
VITE_API_BASE_URL=https://domain.com/api/v1
```

### Common Examples

#### Local Development
```
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

#### Railway Deployment
```
VITE_API_BASE_URL=https://blog-api-prod.railway.app/api/v1
```

#### Render Deployment
```
VITE_API_BASE_URL=https://blog-api.onrender.com/api/v1
```

#### Custom Domain
```
VITE_API_BASE_URL=https://api.myblog.com/api/v1
```

#### Heroku Deployment
```
VITE_API_BASE_URL=https://blog-api-prod.herokuapp.com/api/v1
```

---

## How to Set in Different Platforms

### Vercel

1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL (see examples above)
4. Click "Save"
5. Trigger redeploy:
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

### Netlify

1. Go to Site Settings
2. Navigate to "Build & Deploy" → "Environment"
3. Add variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your backend URL
4. Trigger redeploy in Deployments tab

### GitHub Pages (Manual Deployment)

1. Create `.env.production` locally:
   ```
   VITE_API_BASE_URL=https://your-api-domain/api/v1
   ```
2. Build: `npm run build`
3. Deploy dist folder to GitHub Pages

### Docker

In your Dockerfile:
```dockerfile
ENV VITE_API_BASE_URL=https://backend-url/api/v1
```

---

## Verification

### How to Verify It's Set Correctly

1. **During Build**:
   - Check build logs for environment variables being used
   - Should see your URL in the build output

2. **After Deployment**:
   - Open browser DevTools → Network tab
   - Perform an action (login, create blog, etc.)
   - Check the API request URL
   - Should match your `VITE_API_BASE_URL` setting

3. **In Production**:
   - Visit `/login` or similar
   - Try logging in
   - If login fails:
     - Check Network tab for actual API URLs
     - Verify backend URL is correct
     - Check backend CORS configuration

---

## Troubleshooting

### API Requests Going to Wrong URL

**Problem**: API requests going to `http://localhost:4000` even in production

**Cause**: `VITE_API_BASE_URL` not set or build happened before variable was set

**Solution**:
1. Set `VITE_API_BASE_URL` in platform's environment variables
2. Rebuild the application
3. Verify URL in Network tab after deployment

### CORS Errors

**Problem**: Requests fail with CORS error

**Cause**: Backend hasn't added frontend domain to CORS whitelist

**Solution**:
1. Get your frontend URL (e.g., `https://app.vercel.app`)
2. Add to backend CORS configuration
3. Redeploy backend

Example backend CORS fix:
```javascript
// Add your frontend domain
const allowedOrigins = [
  'http://localhost:3000',           // Local dev
  'https://your-app.vercel.app',     // Your frontend domain
];

app.use(cors({
  origin: allowedOrigins
}));
```

---

## Security Notes

⚠️ **Important**:
- Never commit `VITE_API_BASE_URL` to `.env` file
- Always use `.env.local` or platform environment variables
- The frontend URL is visible to users (it's in network requests)
- The backend must validate all requests (don't trust frontend)
- Use HTTPS in production (never HTTP)

---

## Backend API Requirements

Your backend API must:

1. ✅ Be accessible from the internet (not localhost-only)
2. ✅ Accept requests from your frontend domain
3. ✅ Have CORS configured for your frontend
4. ✅ Have `/api/v1` endpoints:
   - `POST /login` - User login
   - `POST /users` - User registration
   - `PUT /users/:id` - Update profile
   - `DELETE /users/:id` - Delete account
   - `GET /blogs` - Get all blogs
   - `POST /blogs` - Create blog
   - `GET /blogs/:id` - Get blog details
   - `PUT /blogs/:id` - Update blog
   - `DELETE /blogs/:id` - Delete blog
   - `POST /blogs/likes/:id` - Toggle like

---

## Next Steps

1. ✅ Deploy your backend
2. ✅ Get backend URL (e.g., https://api.railway.app)
3. ✅ Configure CORS on backend to allow your frontend
4. ✅ Set `VITE_API_BASE_URL` in deployment platform
5. ✅ Deploy frontend
6. ✅ Test API connectivity

---

## Quick Checklist

- [ ] Backend deployed and running
- [ ] Backend API accessible from internet
- [ ] Backend CORS configured for frontend domain
- [ ] `VITE_API_BASE_URL` set in platform environment variables
- [ ] Frontend deployed
- [ ] Login works (indicates API connectivity)
- [ ] Can create/edit/delete blogs
- [ ] Can like/unlike blogs
- [ ] Network tab shows correct API URLs

---
