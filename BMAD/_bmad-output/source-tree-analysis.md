# Source Tree Analysis

## Root Directory Structure
```text
ticket-system-project/
├── .bmad/               # BMad configuration and context
├── docs/                # Project Knowledge & Documentation
│   ├── planning-artifacts/ # Strategic planning docs
│   └── index.md         # Master Documentation Index
├── react-frontend/      # React SPA Frontend
│   ├── public/          # Static HTML/Favicons
│   └── src/             # Source Code
│       ├── assets/      # Illustrations and branding
│       ├── components/  # Core UI Logic
│       └── index.css    # Global Design System
└── strapi-backend/      # Strapi CMS Backend
    ├── config/          # Server & Plugin configurations
    ├── database/        # Local SQLite Storage
    └── src/
        └── api/         # Content-type definitions (Tickets)
```

## Critical Files & Directories

### 1. React Frontend (`/react-frontend`)
- **`src/components/SubmitTicket.js`**: Core data ingestion point.
- **`src/index.css`**: The source of truth for all styling and layout variables.
- **`src/App.js`**: The main view controller and state hub.

### 2. Strapi Backend (`/strapi-backend`)
- **`src/api/ticket/content-types/ticket/schema.json`**: Defines the backend data structures.
- **`config/middlewares.js`**: Controls security and CORS settings.

### 3. Documentation (`/docs`)
- **`index.md`**: The entry point for understanding the system.
- **`architecture.md`**: Detailed system design logic.
