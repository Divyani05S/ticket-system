# Ticket System - Frontend Application

Welcome to the **Frontend Client** for the Ticket Management System. This Single Page Application (SPA) is built with **React** to provide a seamless interface for users to submit, track, and monitor support tickets. It interacts with a Strapi backend/API service.

## 🌟 Key Features

### 1. 🎫 Submit Tickets
- **Purpose**: Allow users to raise new support requests.
- **Capabilities**:
  - Dynamic Form Validation (Client-side).
  - Priority selection (Low, Medium, High).
  - Real-time feedback on submission success or failure.
  
### 2. 🔍 Track Status
- **Purpose**: Enable users to check the status of their reported issues.
- **Capabilities**:
  - Lookup by Email Address.
  - View detailed ticket status (Open, In Progress, Resolved).
  - View Ticket ID and full description.

### 3. 👀 Live Activity (AllTicketsPeek)
- **Purpose**: Social proof and transparency.
- **Capabilities**:
  - "Peek-a-boo" drawer showing the 10 most recent global tickets.
  - Auto-updates based on user interaction (Close/Open).

---

## 🛠️ Technical Architecture

### Core Stack
- **Framework**: React 19 (Functional Components + Hooks)
- **Build Tool**: Create React App (React Scripts 5.0.1)
- **HTTP Client**: Axios (Promise-based API calls)
- **Styling**: Vanilla CSS (Global variables + Component-scoped styles)
- **Testing**: React Testing Library

### Project Structure
```bash
react-frontend/
├── public/              # Static assets (index.html, manifest)
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Functional UI Components
│   │   ├── AllTicketsPeek.js  # Recent activity drawer
│   │   ├── SubmitTicket.js    # Submission form logic
│   │   └── TrackTickets.js    # Status lookup logic
│   ├── App.js           # Main layout application wrapper
│   ├── App.css          # Main layout styles
│   ├── config.js        # Centralized API configuration
│   ├── index.css        # Global Design System (Vars, Reset)
│   └── index.js         # Entry point
└── package.json         # Dependencies and Scripts
```

### Configuration
The application uses a centralized configuration file `src/config.js` to manage environment-specific settings.

**Environment Variables:**
- `NODE_ENV`: Automatically set by React Scripts (`development` vs `production`).
- `REACT_APP_API_URL`: (Optional) Override backend URL.

**Defaults:**
- **Development**: `http://localhost:1337` (Standard Strapi port)
- **Production**: `https://ticket-backend1.onrender.com`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository and navigate to the frontend folder:
   ```bash
   cd react-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server with Hot Module Replacement (HMR):
```bash
npm start
```
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production
Create an optimized, minified bundle:
```bash
npm run build
```
- The output will be in the `build/` directory.
- This folder is ready to be deployed to static hosting (Vercel, Netlify, Render, etc.).

---

## 🔌 API Integration

The application communicates with the backend via RESTful endpoints defined in `src/config.js`.

| Feature | Endpoint | Method | Description |
|---------|----------|--------|-------------|
| **Submit** | `/api/tickets` | `POST` | Creates a new ticket entry. |
| **Track** | `/api/tickets` | `GET` | Filters tickets by `email` query param. |
| **Peek** | `/api/tickets` | `GET` | Fetches recent tickets with sorting & pagination. |

---

## 🎨 Styling & Design System

The project uses a CSS variable-based design system defined in `src/index.css`.

**Key Variables:**
- `--primary`: Main brand color.
- `--bg-dark`, `--bg-card`: Dark mode background shades.
- `--text-main`, `--text-muted`: Typography colors.
- `--success`, `--warning`, `--error`: Status indicators.

To modify the theme, edit the `:root` variables in `src/index.css`.

---

## 📚 Advanced Documentation

For detailed architecture decisions and analysis, refer to the **BMAD Generated Documentation** located in `BMAD/_bmad-output/`:

- [**Architecture.md**](BMAD/_bmad-output/architecture.md): Deep dive into data flow and patterns.
- [**Component-Inventory.md**](BMAD/_bmad-output/component-inventory.md): Detailed breakdown of all UI components.
- [**Development-Guide.md**](BMAD/_bmad-output/development-guide.md): Extended setup and contribution practices.

---

## 🤝 Contributing

1. Fork the repository.
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request.
