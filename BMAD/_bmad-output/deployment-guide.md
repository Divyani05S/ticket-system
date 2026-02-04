# Deployment Guide

## Overview
This project consists of two main parts that must be deployed separately but interconnected.

## 1. Backend Deployment (Strapi)
**Target**: Coolify, Heroku, or Portainer.

### Variables Needed
- `DATABASE_CLIENT`: `sqlite` (or `postgres` for production).
- `APP_KEYS`: Random strings for security.
- `API_TOKEN_SALT`: Salt for API tokens.
- `ADMIN_JWT_SECRET`: Secret for admin dashboard.

### Steps
1. Push `strapi-backend/` to your Git repository.
2. Build the production bundle: `npm run build`.
3. Start the server: `npm run start`.
4. **Important**: Configure the Public Role permissions in the production Admin Panel.

## 2. Frontend Deployment (React)
**Target**: Vercel, Netlify, or Static Hosting.

### Variables Needed
- `REACT_APP_API_URL`: The URL of your deployed Strapi backend (e.g., `https://api.yourdomain.com`).

### Steps
1. Push `react-frontend/` to your Git repository.
2. Build the production site: `npm run build`.
3. Point your hosting provider to the `build/` folder.

## Integration Checklist
- [ ] CORS: Add your frontend domain to the Strapi middleware config (`config/middlewares.js`).
- [ ] HTTPS: Ensure both frontend and backend use SSL for secure data transfer.
- [ ] Permissions: Verify that the `Public` role has `create` and `find` enabled in production.
