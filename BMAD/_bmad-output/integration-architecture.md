# Integration Architecture

## Overview
This document describes the communication layer between the React client and the Strapi headless CMS.

## Communication Pattern
- **Protocol**: HTTP/HTTPS
- **Data Format**: JSON
- **Mechanism**: RESTful API calls using the `Axios` library.

## Data Flow Diagrams

### 1. Ticket Submission
```text
[ User Form ] --(Validation)--> [ Axios POST /api/tickets ] --> [ Strapi Controllers ] --> [ SQLite Storage ]
```

### 2. Dashboard Feed (Peek)
```text
[ AllTicketsPeek ] --(useEffect)--> [ GET /api/tickets?sort=desc ] --> [ Strapi API ] --> [ React State Render ]
```

## Integration Points

### Backend Configuration
- **Middlewares**: Strapi's built-in `cors` middleware allows requests from the frontend origin.
- **Roles & Permissions**: Access is governed by the `Public` role in the `users-permissions` plugin (allow `create`, `find`, `findOne`).

### Frontend Implementation
- **Base URL**: Currently hardcoded as `http://localhost:1337`.
- **Payload Mapping**:
  - Frontend matches Strapi's `data` wrapping requirement.
  - Custom mapping for `priority` enumeration values.

## Future Plans
- **Real-time Updates**: Implement WebSockets (Socket.io) for live ticket status notifications.
- **Authentication**: Integrate Strapi's JWT authentication for privileged actions (e.g., ticket deletion/resolution).
