# Architecture Documentation

## Architecture Pattern
The application follows a **Component-Based Architecture** typical of React applications. It separates concern into reusable UI components that manage their own local state and communicate with a backend service.

### Design Principles
- **Functional Components**: Usage of React hooks (`useState`, `useEffect`) for logic.
- **Separation of Concerns**: specialized components for specific tasks (`SubmitTicket`, `TrackTickets`).
- **Configuration Layout**: Centralized configuration in `config.js` for API endpoints.

## Data Architecture
### Data Models
Primary entity: **Ticket**
- Structure inferred from use cases:
  - `id`: Unique identifier
  - `subject`: Ticket title
  - `description`: Issue details
  - `email`: User contact
  - `status`: Current state (Open, In Progress, Closed)
  - `created_at`: Timestamp

### Data Flow
1. **User Input** -> Component State
2. **Component** -> Axios Request -> API Backend
3. **API Response** -> Component State -> UI Update

## API Design
The frontend consumes a RESTful API.
- **Base URL**: Configured in `src/config.js`
- **Endpoints**:
  - `POST /api/tickets`: Create a new ticket (SubmitTicket)
  - `GET /api/tickets`: Retrieve tickets (AllTicketsPeek)
  - `GET /api/tickets/{id}`: Retrieve specific ticket (TrackTickets) (Assumed)

## Component Overview
1. **App.js**
   - Root container.
   - Manages high-level layout and navigation between views.

2. **SubmitTicket.js**
   - Form handling for ticket creation.
   - Validation logic.
   - API submission.

3. **TrackTickets.js**
   - Interface for users to query ticket status.
   - Displays detailed ticket information.

4. **AllTicketsPeek.js**
   - Dashboard widget showing recent activity.
   - Fetches list of tickets.

## Development Workflow
- **Local Dev**: `npm start` (Hot Module Replacement)
- **Build**: `npm run build` (Production optimization)
- **Linting**: ESLint configured via `package.json`.
