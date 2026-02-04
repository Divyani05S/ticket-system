# Component & Source Inventory

This inventory documents the backend's module structure, mapping the business domain to code locations.

## Content Types (Domain Models)

### **Ticket** `src/api/ticket/`
The primary business entity.
-   **Schema**: `src/api/ticket/content-types/ticket/schema.json`
    - Defines fields, validation rules, and database mapping.
-   **Routes**: `src/api/ticket/routes/ticket.ts`
    - Auto-generated REST endpoints (Create, Find, FindOne, Update, Delete).
-   **Controller**: `src/api/ticket/controllers/ticket.ts`
    - *Default Factory Implementation*: Uses `createCoreController`. Can be extended to override specific actions (e.g., custom validation on create).
-   **Service**: `src/api/ticket/services/ticket.ts`
    - *Default Factory Implementation*: Uses `createCoreService`.

## Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `config/database.ts` | DB Connection | Postgres (Prod) vs SQLite (Dev), SSL settings. |
| `config/server.ts` | Host/Port Config | Port 1337, App Keys, External URL mapping. |
| `config/admin.ts` | Admin Panel | Admin auth secrets, transfer tokens. |
| `config/middlewares.ts` | Pipeline | CORS, Security, Logger, Query Parser. |

## Critical System Files

| File | Location | Purpose |
|------|----------|---------|
| `package.json` | Root | Dependencies, Scripts (`strapi develop`). |
| `.env` | Root | Secrets (DATABASE_URL, APP_KEYS). |
| `public/uploads/` | `public/` | Storage for uploaded media (local provider). |
