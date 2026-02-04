# Architecture Documentation

## Architecture Pattern
The backend utilizes **Strapi's Plugin-based Architecture**. It is designed as a modular, extensible API server where features are defined as "Content Types" or "Plugins".

### Core Design Principles
1.  **Configuration over Code**: Much of the API behavior (routes, validation) is defined in declarative `schema.json` files rather than heavy controller logic.
2.  **Environment Isolation**: `config/database.ts` switches between SQLite (local) and PostgreSQL (Production) based on `NODE_ENV`.
3.  **Headless Distribution**: The backend has zero knowledge of the frontend implementation, serving strict JSON responses.

## Data Architecture

### Database Schema
The core entity is the **Ticket**.

**Table: tickets**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | Summary of the issue |
| `description` | Text | Yes | Detailed explanation |
| `email` | Email | No | User's contact email |
| `priority` | Enum | No | `Low`, `Medium`, `High` |
| `curr_status` | Enum | No | `Open`, `In Progress`, `Resolved` |
| `assigned_to` | String | No | Staff member name |

### Data Flow
1.  **Request**: Frontend sends `POST /api/tickets` with JSON payload.
2.  **Routing**: Strapi Router matches URL to `src/api/ticket/routes/ticket.ts`.
3.  **Controller**: `src/api/ticket/controllers/ticket.ts` receives context.
4.  **Service**: `src/api/ticket/services/ticket.ts` handles logic (default EntityService).
5.  **ORM/Query**: EntityService translates to SQL via Strapi Database Layer (Knex.js under the hood).
6.  **Persistence**: Data stored in PostgreSQL.

## API Design
The API follows standard Strapi REST patterns with a wrapper structure.

**Global Response Format:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Example",
      ...
    }
  },
  "meta": { ... }
}
```

## Infrastructure Architecture
-   **Platform**: Render.
-   **Database**: Managed PostgreSQL on Render.
-   **Asset Storage**: Local (temporary) or Cloud Provider (if plugin configured - currently looks like local/default).
-   **Process Management**: `yarn start` / `npm run start`.
