# API Contracts

## Overview
The frontend interacts with a Strapi backend.
**Base URL**: `https://ticket-backend1.onrender.com` (Production) or `http://localhost:1337` (Development).
Defined in: `src/config.js`

## Endpoints

### 1. Create Ticket
- **Method**: `POST`
- **Path**: `/api/tickets`
- **Purpose**: Submit a new support ticket.
- **Request Body**:
  ```json
  {
    "data": {
      "title": "Issue Summary",
      "email": "user@example.com",
      "priority": "Medium",
      "description": "Detailed description..."
    }
  }
  ```
- **Response**:
  ```json
  {
    "data": {
      "id": 1,
      "attributes": { ... }
    }
  }
  ```

### 2. Track Tickets
- **Method**: `GET`
- **Path**: `/api/tickets`
- **Query Params**: `filters[email][$eq]=user@example.com`
- **Purpose**: Retrieve tickets for a specific user.
- **Response Data Model**:
  - `id` / `documentId`
  - `title`
  - `curr_status` (Status of ticket)
  - `priority`
  - `description`

### 3. Recent Tickets (Peek)
- **Method**: `GET`
- **Path**: `/api/tickets`
- **Query Params**: `sort=createdAt:desc&pagination[limit]=10`
- **Purpose**: Get list of 10 most recent tickets.
