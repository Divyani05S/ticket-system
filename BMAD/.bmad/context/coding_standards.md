# Coding Standards

## Frontend (React)
- **Component Style**: Functional components with hooks.
- **State Management**: Local `useState` for UI state; no global state manager (Redux/Context) detected yet.
- **Naming Conventions**: PascalCase for components (`SubmitTicket.js`), camelCase for variables/functions.
- **API Communication**: Centralized `axios` calls within components (Recommendation: Move to a shared API service).
- **Styling**: Vanilla CSS using CSS Variables defined in `index.css`.
- **Validation**: Manual regex and length checks before submission.

## Backend (Strapi)
- **Architecture**: Standard Strapi 5 "Content-Type" pattern.
- **Schema Management**: JSON-based schema definitions in `content-types`.
- **Naming**: Singular names for content types (`ticket`).

## General Patterns
- **Error Handling**: `try-catch` blocks for asynchronous operations with user-facing alerts.
- **Loading States**: Spinner indicators used during API requests.
- **Compatibility**: Backend-to-Frontend mapping for schema typos (e.g., `Meduim` in Strapi vs `Medium` in UI).
