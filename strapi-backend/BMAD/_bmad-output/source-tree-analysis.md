# Source Tree Analysis

This document provides an annotated view of the project's directory structure, highlighting critical entry points and configuration locations.

## Directory Tree

```text
strapi-backend/
├── .strapi/                 # Internal Strapi cache/build artifacts
├── config/                  # [CRITICAL] Environment & Server Configuration
│   ├── admin.ts             # Admin panel setup
│   ├── api.ts               # API response settings
│   ├── database.ts          # [CRITICAL] DB Connection Logic (Postgres/SQLite)
│   ├── middlewares.ts       # Middleware stack definition
│   └── server.ts            # Server host/port config
├── public/                  # Static assets
│   ├── uploads/             # Media library storage (Local provider)
│   └── robots.txt
├── src/                     # [CRITICAL] Application Source Code
│   ├── admin/               # Admin panel customizations
│   └── api/                 # Domain Logic Modules
│       └── ticket/          # [FEATURE] Ticket Management Module
│           ├── content-types/
│           │   └── ticket/
│           │       └── schema.json  # [CRITICAL] Data Model Definition
│           ├── controllers/ # Custom controller logic
│           ├── routes/      # Custom route definitions
│           └── services/    # Custom business logic
├── types/                   # TypeScript definitions
├── .env                     # [SECRET] Environment Variables
├── .gitignore               # Git exclusions
├── package.json             # Project Dependencies & Scripts
├── tsconfig.json            # TypeScript Configuration
└── yarn.lock / package-lock.json
```

## Critical Folders Explained

### `config/`
This is the brain of the infrastructure. Modifying `database.ts` changes where data lives. `server.ts` dictates how the app listens for requests. **Changes here require a server restart.**

### `src/api/`
This is where features live. Strapi generates an API for every subfolder here.
-   **`content-types/**/schema.json`**: This is the Single Source of Truth for your data model. Changing this changes the database table structure.

### `public/uploads/`
Where images and files uploaded via the Media Library are stored when using the default local provider. In production (Render), this data is **ephemeral** unless persisted to an external volume or S3.

## Entry Points
-   **Application Start**: `npm run start` -> executes `strapi start` -> loads `config/*` -> boots APIs in `src/api/*`.
-   **Development**: `npm run develop` -> starts server with auto-reload (Wait for `[INFO] Server running...`).
