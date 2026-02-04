# Project Overview

## Executive Summary
This project is the backend service for the Ticket Management System. It is a headless CMS built with **Strapi v5**, providing a robust API for managing support tickets. The backend handles data persistence (PostgreSQL in production), user permissions, and content management via the Strapi Admin Panel. It is designed to be deployed on Render.

## Technology Stack

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| Framework | Strapi | 5.34.0 | Headless CMS & API Framework |
| Language | TypeScript | 5.x | Core Language |
| Database | PostgreSQL | 8.18 | Production Database (Render) |
| Fallback DB | SQLite | - | Local Development (Fallback) |
| Runtime | Node.js | >=20 | Execution Environment |
| Plugins | Users-Permissions | 5.34.0 | Auth & Role Management |
| Plugins | Cloud | 5.34.0 | Strapi Cloud Integration |

## Repository Structure
The project follows standard Strapi architecture:
- **`config/`**: Environment and server configurations (database, server, admin).
- **`src/`**: Application source code.
    - **`api/`**: Business logic, split by content-type (e.g., `ticket/`).
        - **`controllers/`**: Request handlers.
        - **`routes/`**: API endpoints.
        - **`services/`**: Core logic.
        - **`content-types/`**: Schema definitions (`schema.json`).
    - **`admin/`**: Admin panel configurations.
- **`public/`**: Static assets (uploads).
- **`types/`**: TypeScript type definitions.

## Architecture Type
**Headless CMS / API Server**
- **Pattern**: MVC-like (Model via Content Types, View via API JSON, Controller via Controllers).
- **API Style**: RESTful (Default Strapi).
- **Deployment**: Render (PaaS) with Docker-compatible structure.

## Key Features
1.  **Ticket Management**: CRUD operations for support tickets.
2.  **Schema Enforcement**: Rigid data modeling for ticket attributes (Task, Priority, Email, Status).
3.  **Role-Based Access Control (RBAC)**: Managed via `users-permissions` plugin (Public vs Authenticated).
4.  **Environment Awareness**: Dynamic configuration for Dev vs Prod (Postgres SSL, URL handling).
