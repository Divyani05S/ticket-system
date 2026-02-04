# Source Tree Analysis

```text
ticket-system-project/
├── .bmad/               # BMad configuration and context
│   └── context/         # Sharded context documentation
├── react-frontend/      # React application code (CRA)
│   ├── public/          # Static assets
│   └── src/
│       ├── assets/      # UI illustrations and images
│       ├── components/  # Functional UI components
│       │   ├── AllTicketsPeek.js  # Recent activity dashboard
│       │   ├── SubmitTicket.js    # Ticket submission form
│       │   └── TrackTickets.js     # Ticket search/tracking
│       ├── App.js       # Main application shell & router
│       ├── index.css    # Global design system
│       └── index.js     # Application entry point
└── strapi-backend/      # Strapi CMS logic & schema
    ├── config/          # Strapi configuration
    ├── database/        # SQLite database storage
    ├── public/          # Strapi static assets
    └── src/
        ├── api/         # Content-type definitions
        │   └── ticket/  # Ticket API logic
        │       ├── content-types/  # Schema definitions
        │       ├── controllers/    # API controllers
        │       ├── routes/         # API endpoints
        │       └── services/       # Business logic
        └── index.js     # Backend entry point
```

## Critical Directories
- `react-frontend/src/components`: Contains the core user interaction logic.
- `strapi-backend/src/api`: Defines the data structures and API contracts.
- `react-frontend/src/index.css`: The "Single Source of Truth" for the design system.
