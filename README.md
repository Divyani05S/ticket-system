# Modern Support Ticket System

A professional, full-stack support ticket management system built with **React** and **Strapi 5**. This application features a premium dark-mode UI, real-time ticket tracking, and an interactive "peek-a-boo" dashboard.

## 🚀 Features

- **Premium UI/UX**: Modern dark-theme aesthetic using glassmorphism and smooth animations.
- **Ticket Submission**: Validated form to submit issues with title, email, priority, and description.
- **Ticket Tracking**: Search and monitor the status of your tickets via email.
- **Peek-a-boo Dashboard**: Interactive side-drawer to view recent global ticket activity.
- **Robust Validation**: Strict client-side email and length validation to ensure data integrity.
- **Responsive Design**: Fully responsive layout that works across devices.

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, CSS3 (Vanilla with modern variables).
- **Backend**: Strapi 5 (Headless CMS).
- **Database**: SQLite (Quickstart default).

## 📋 Prerequisites

- **Node.js**: v18 or higher.
- **Strapi 1337 Port**: Ensure port 1337 is available for the backend.

## ⚙️ Installation & Setup

### 1. Backend Setup (Strapi)
```bash
cd strapi-backend
npm install
npm run develop
```
**Important**: After starting Strapi:
1. Go to **Settings** > **Roles** > **Public**.
2. Under **Ticket**, enable `create`, `find`, and `findOne`.
3. Save the changes.

### 2. Frontend Setup (React)
```bash
cd react-frontend
npm install
npm start
```
The app will be available at `http://localhost:3000`.

## 📁 Project Structure

```text
ticket-system-project/
├── react-frontend/      # React application code
│   ├── src/
│   │   ├── components/  # Submit, Track, and Peek components
│   │   ├── assets/      # UI illustrations
│   │   └── index.css    # Global design system
└── strapi-backend/      # Strapi CMS logic & schema
```

## 📄 License

Built for demonstration and internal support tracking.
© 2026 Ticketing System
