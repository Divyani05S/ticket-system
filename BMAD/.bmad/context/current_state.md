# Current State (Truth File)

## Status: Operational (Development)
The project is a functional Support Ticket System with a React frontend and a Strapi backend.

### ✅ What Works
- **Ticket Submission**: Users can submit tickets with validation and priority mapping.
- **Recent Activity Peek**: Side-drawer fetches and displays the last 10 tickets globally.
- **Design System**: A high-premium dark mode UI is implemented via `index.css`.
- **Backend API**: Strapi is configured with a `Ticket` collection type.

### ⚠️ Known Issues / Technical Debt
- **Strapi Schema Typo**: The priority level "Medium" is spelled as "Meduim" in the Strapi schema. This is currently patched in the frontend but should be corrected at the source.
- **Hardcoded URLs**: Both `SubmitTicket.js` and `AllTicketsPeek.js` use `http://localhost:1337` directly.
- **Single Source of Truth**: Assets (like `heroImage`) are imported directly; no centralized asset manager.
- **State Management**: Manual state-based routing in `App.js` may become complex as more views are added.

### 🛠️ In-Progress / Needed
- **Detailed Ticket Tracking**: `TrackTickets.js` logic for searching by email needs review for "exhaustiveness" (current implementation exists but status updates are basic).
- **Environment Variables**: Frontend needs `.env` for API base URL.
- **Strapi Permissions**: Documentation reminds users to enable Public permissions; this should be automated or documented clearly in a setup script.
