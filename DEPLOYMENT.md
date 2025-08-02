# Deployment Guide for NextProperty

This project is configured to deploy both frontend and backend together on Render as a single web service.

## Deployment Configuration

### Render Configuration
- **Root Directory**: Project root (where this README is located)
- **Build Command**: `npm run install-all && npm run build-all`
- **Start Command**: `cd Backend && node index.js`
- **Environment**: Node.js

### Build Process
1. `npm run install-all` - Installs dependencies for root, backend, and frontend
2. `npm run build-all` - Builds the React app and copies the dist folder to Backend/dist

### Static File Serving
The backend Express.js server is configured to:
- Serve static files from `Backend/dist` (React build output)
- Handle all unknown routes (`*`) by serving `index.html` for client-side routing
- API routes are mounted under `/api` prefix

## Local Development
- `npm run dev` - Runs both frontend and backend in development mode
- `npm run install-all` - Installs all dependencies
- `npm run build-all` - Builds frontend and prepares for deployment

## Environment Variables
Make sure to set up the following environment variables in Render:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `NODE_ENV` - Set to "production"

## File Structure After Build
```
Backend/
├── dist/           # React build output (copied from frontend/dist)
│   ├── index.html
│   ├── assets/
│   └── ...
├── index.js        # Express server with static file serving
└── ...
```

## Notes
- The frontend builds to `dist` folder (Vite default)
- The build process copies `frontend/dist` to `Backend/dist`
- All API routes are prefixed with `/api`
- Client-side routing is handled by serving `index.html` for unknown routes 