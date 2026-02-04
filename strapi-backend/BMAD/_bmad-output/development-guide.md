# Development & Deployment Guide

## Prerequisites
-   **Node.js**: Version 20.x or higher (Required by Strapi v5).
-   **Package Manager**: `npm` (v10+) or `yarn` (v1.22+).
-   **Database**:
    -   *Local*: None required (uses SQLite).
    -   *Production*: PostgreSQL (Required).

## Local Development Setup

1.  **Install Dependencies**
    ```bash
    cd strapi-backend
    npm install
    # or
    yarn install
    ```

2.  **Environment Configuration**
    Create a `.env` file in the root based on `.env.example`:
    ```env
    HOST=0.0.0.0
    PORT=1337
    APP_KEYS="toBeModified1,toBeModified2"
    API_TOKEN_SALT=tobemodified
    ADMIN_JWT_SECRET=tobemodified
    TRANSFER_TOKEN_SALT=tobemodified
    
    # Optional - Only for Postgres testing locally
    # DATABASE_CLIENT=postgres
    # DATABASE_URL=postgres://user:pass@localhost:5432/strapi
    ```

3.  **Start Development Server**
    ```bash
    npm run develop
    ```
    -   **Admin Panel**: `http://localhost:1337/admin`
    -   **API Root**: `http://localhost:1337/api`

## Production Deployment (Render)

### Configuration
The project is pre-configured for Render via `config/database.ts` which looks for `DATABASE_URL`.

1.  **Build Command**: `npm install && npm run build`
    -   This compiles the TypeScript code and builds the Admin UI.
2.  **Start Command**: `npm run start`

### Environment Variables (Required on Render)
-   `NODE_ENV`: `production`
-   `DATABASE_URL`: Connection string provided by Render PostgreSQL.
-   `APP_KEYS`: Comma-separated random strings.
-   `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`: Random secure strings.

## Database Migrations
Strapi handles migrations automatically based on `schema.json` changes.
-   **Dev**: Changes are applied instantly on server restart.
-   **Prod**: Changes are applied when the application boots up.

## Testing
*Currently, no automated test suite is configured (Standard for MVP Strapi setups).*
-   **Manual Testing**: Use Postman or the Frontend app to verify API endpoints.
