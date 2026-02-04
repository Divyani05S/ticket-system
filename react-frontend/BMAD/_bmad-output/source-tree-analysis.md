# Source Tree Analysis

## Directory Structure
```
react-frontend/
├── BMAD/                # BMAD Agent Framework & Outputs
│   └── _bmad-output/    # Generated Documentation
├── _bmad/               # BMAD Core Tools (Legacy/Active)
├── public/              # Static Assets (favicon, html)
├── src/
│   ├── assets/          # Project images and media
│   ├── components/      # UI Components
│   │   ├── AllTicketsPeek.js
│   │   ├── SubmitTicket.js
│   │   └── TrackTickets.js
│   ├── App.css          # App-specific styles
│   ├── App.js           # Main Entry Component
│   ├── config.js        # Global configuration (API URLs)
│   ├── index.css        # Global styles / Theme
│   ├── index.js         # Application Entry Point
│   └── reportWebVitals.js
├── package.json         # Project manifests & scripts
└── README.md            # Default CRA Readme
```

## Critical Folders
- **`src/components/`**: The Core logic enables the business features.
- **`src/`**: The root of the application logic.

## Entry Points
- **`src/index.js`**: Bootstraps the React application and mounts it to the DOM.
- **`src/App.js`**: The main Layout definition.
