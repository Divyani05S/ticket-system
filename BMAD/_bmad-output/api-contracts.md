# API Contracts

## Base URL
`http://localhost:1337/api`

## Authentication
Currently configured for **Public Access**.
*Note: In production, use API Tokens or JWT via the Users-Permissions plugin.*

## Endpoints

### 1. Tickets Collection

#### [POST] /tickets
Submit a new support ticket.

**Request Body:**
```json
{
  "data": {
    "title": "string",
    "description": "string",
    "email": "string",
    "priority": "Low | Meduim | High",
    "curr_status": "Open | In Progress | Resolved",
    "assigned_to": "string"
  }
}
```
*Note: The frontend currently maps "Medium" to "Meduim" due to a schema typo.*

#### [GET] /tickets
Fetch tickets with filtering and sorting.

**Query Parameters:**
- `sort=createdAt:desc`: Sort by creation date.
- `filters[email][$eq]=user@example.com`: Filter by user email.
- `pagination[limit]=10`: Limit results for the dashboard.

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Sample Issue",
        "description": "System is slow...",
        "email": "test@test.com",
        "priority": "High",
        "curr_status": "Open",
        "createdAt": "2026-02-04T...",
        "updatedAt": "2026-02-04T..."
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### 2. Strapi Core Endpoints
- `/users-permissions/roles`: Manage permissions.
- `/upload`: Asset management.
