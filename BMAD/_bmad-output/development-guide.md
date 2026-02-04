# Development Guide

## Local Setup

### Prerequisites
- **Node.js**: v18 or higher.
- **npm**: v8 or higher.

### Repository Architecture
- `/react-frontend`: The user interface.
- `/strapi-backend`: The API and database layer.

## Running the Project

### 1. Start the Backend
```bash
cd strapi-backend
npm install
npm run develop
```
- **Access**: `http://localhost:1337/admin`
- **Initial Setup**: Create the first admin user and enable "Public" permissions for the `Ticket` collection.

### 2. Start the Frontend
```bash
cd react-frontend
npm install
npm start
```
- **Access**: `http://localhost:3000`

## Common Development Tasks

### Modifying the Schema
To add a new field to the Ticket model:
1. Go to the Strapi Admin Panel -> **Content-Type Builder**.
2. Add the field and click **Save**.
3. Update `react-frontend` components to handle the new data.

### Styling Changes
- All global styles and theme tokens are located in `react-frontend/src/index.css`.
- Use CSS variables for consistent dark-mode styling.

## Troubleshooting
- **CORS Errors**: Ensure the frontend is calling the correct backend port (1337).
- **Broken Images**: Check that the path to `heroImage` is correct in `App.js`.
