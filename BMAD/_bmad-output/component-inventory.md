# Component Inventory

## Frontend Components (react-frontend)

### 1. Main Shell
- **`App.js`**: Core layout, navigation state (`landing`, `submit`, `track`), and root container.

### 2. Functional Components

| Component | Path | Description | Key Features |
|-----------|------|-------------|--------------|
| **SubmitTicket** | `/src/components/SubmitTicket.js` | Main form for ticket creation. | Validation, Priority mapping, Axios POST. |
| **TrackTickets** | `/src/components/TrackTickets.js` | Tracking interface for users. | Email-based search, Status visualization. |
| **AllTicketsPeek** | `/src/components/AllTicketsPeek.js` | Side-drawer for global activity. | Real-time fetch (last 10), responsive tray. |

### 3. Shared Elements (CSS)
- **Design System**: Atomic variables in `index.css`.
- **Alerts**: Global success/error notification styles.
- **Buttons**: Variable-based button styles (`btn-primary`, `btn-ghost`).

## Shared Assets
- **`support_hero.png`**: Central hero illustration for the dashboard.
- **`logo.svg`**: Application branding.

## Categorization
- **Forms**: `SubmitTicket`
- **Data Display**: `TrackTickets`, `AllTicketsPeek`
- **Layout**: `App`, `index.css`
