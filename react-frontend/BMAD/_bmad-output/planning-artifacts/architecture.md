---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['project-overview.md', 'reference-architecture.md']
workflowType: 'architecture'
project_name: 'react-frontend'
user_name: 'Dee'
date: '2026-02-05'
lastStep: 8
status: 'complete'
completedAt: '2026-02-05'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
1.  **Ticket Submission**: Secure form to capture ticket details (Title, Email, Priority, Description) with validation.
2.  **Ticket Tracking**: Mechanism to look up tickets by email and view their current status.
3.  **Live Activity Feed**: "Peek-a-boo" drawer to show recent ticket activity for social proof/transparency.
4.  **Responsive UI**: Interface must adapt to mobile and desktop viewports.

**Non-Functional Requirements:**
1.  **Performance**: Fast load times for the SPA bundle; optimistic UI updates where possible.
2.  **Reliability**: Graceful error handling if the backend is unreachable.
3.  **Maintainability**: Component-based architecture with clear separation of concerns.
4.  **Usability**: Clear feedback on form submission (success/error toasts).

**Scale & Complexity:**
The project complexity is **Low**. It is a focused Single Page Application without complex global state management or heavy computational needs.

-   **Primary domain**: Web Frontend (React 19)
-   **Complexity level**: Low
-   **Estimated architectural components**: ~5-8 Core Components

### Technical Constraints & Dependencies

1.  **Backend Dependency**: Tightly coupled to Strapi API structure.
2.  **Vercel Deployment**: Must support Vercel's build and deployment pipeline.
3.  **Styling**: Pure CSS variables (no heavy CSS-in-JS libraries requested per current docs).

### Cross-Cutting Concerns Identified

1.  **API Configuration**: Centralized management of endpoints and base URLs.
2.  **Error Handling**: Consistent UI for API failures.
3.  **Loading States**: Unified spinner/skeleton loader patterns.
4.  **Theming**: Global CSS variables for consistent design system.

## Base Architecture / Starter Evaluation

### Primary Technology Domain
**Brownfield Web Application** (Existing Project)

### Current Foundation Analysis
The project is built on **Create React App (CRA)**.

**Rationale for Retaining:**
-   **Stability**: The existing codebase is functional and deployed.
-   **Complexity**: The current scope (Ticket System) does not demand Server Side Rendering (SSR) functionality that would necessitate a migration to Next.js.
-   **Cost/Benefit**: Migrating to Vite would offer faster build times, but the current "Component-Based SPA" architecture works well for the requirements.

**Architectural Decisions Provided by Current Setup:**

**Language & Runtime:**
-   **JavaScript** (ES6+) running in the Browser.
-   **React 19** for UI Components.

**Build Tooling:**
-   **Webpack** (via `react-scripts 5.0.1`).
-   Standard CRA configuration (no `eject` needed yet).

**Styling Solution:**
-   **Vanilla CSS** imported into components.
-   **Global Styles** in `index.css`.

**Code Organization:**
-   **Monolithic Frontend**: All code in `src/`.
-   **Feature-by-File**: Components like `SubmitTicket.js` encapsulate logic and UI.

**Note:** Future architectural reviews should monitor build times; if performance degrades, a migration to **Vite** can be planned as a technical debt reduction story.

## Core Architectural Decisions

### Data Architecture
-   **State Management**: **Local Component State + Context API**.
    -   *Rationale*: App complexity is low. `useState` and custom hooks are sufficient for form data and ticket lists. Avoids external dependency bloat.
-   **Data Fetching**: **Axios** with custom service layer.
    -   *Rationale*: Centralized API logic facilitates easier maintenance and testing than inline `fetch` calls.

### Authentication & Security
-   **Auth Model**: **Transactional / Email-based**.
    -   *Rationale*: No persistent user accounts required for MVP. Ticket lookup is performed via email match.
-   **Validation Strategy**: **Client-side Zod (or custom regex)** + Server-side validation.
    -   *Rationale*: Immediate UI feedback for users; backend serves as the final truth.

### API & Communication Patterns
-   **Protocol**: **REST** (Strapi Default).
-   **Error Handling**: Global interceptors in Axios to handle 401/403/500 errors uniformly.
    -   *Rationale*: Ensures consistent user experience regardless of where the error originates.

### Infrastructure & Deployment
-   **Hosting**: **Vercel** (Static Site Hosting).
    -   *Rationale*: Zero-config deployment for CRA builds; best-in-class global CDN.
-   **CI/CD**: **Vercel GitHub Integration**.
    -   *Rationale*: Automatic deployments on push to `main`.

## Implementation Patterns & Consistency Rules

### Naming Patterns

**API & Data:**
-   **Variables/Properties**: `camelCase` (e.g., `ticketId`, `userEmail`).
-   **API Response Fields**: **Preserve Backend Format** (likely `snake_case` or `camelCase` depending on Strapi config). *Constraint: Do not map/transform keys unless necessary.*
-   **Routes**: Kebab-case for URLs (e.g., `/my-tickets`, `/submit-ticket`).

**Code Components:**
-   **React Components**: `PascalCase` (e.g., `SubmitTicket`, `TrackTickets`).
-   **File Names**: Match Component Name (e.g., `SubmitTicket.js`).
-   **CSS Classes**: `kebab-case` (e.g., `.ticket-card`, `.status-badge`).

### Structure Patterns

**Project Organization:**
-   **Component Co-location**: Styles can be in `App.css` or `index.css` for global, use specific class names to scope.
-   **Configuration**: All API URLs and environment config MUST live in `src/config.js`. *No hardcoding URLs in components.*

### Process Patterns

**Error Handling:**
-   **UI Feedback**: Use `alert-error` class div for form errors.
-   **Console Logging**: Log full error objects for debugging, but show user-friendly messages in UI.

**Loading States:**
-   **Pattern**: Boolean `loading` state in component + disabled button/spinner.
-   **Spinner**: Standard CSS spinner class (as seen in `SubmitTicket.js`).

### Enforcement Guidelines

**All AI Agents MUST:**
1.  **Strictly use `axios`** for network requests (do not use `fetch`).
2.  **Import `API_ENDPOINTS`** from `config.js` for all URL references.
3.  **Validate inputs** before sending to backend to reduce API load.

**Anti-Patterns:**
-   ❌ Inline `style={{...}}` for static styles (use classes).
-   ❌ Hardcoded `http://localhost:1337` strings in components.
-   ❌ Direct DOM manipulation (use `useRef` if absolutely necessary).

## Project Structure & Boundaries

### Complete Project Directory Structure
```text
react-frontend/
├── .github/                 # GitHub Actions (CI/CD)
├── BMAD/                    # AI Agent Context
│   └── _bmad-output/        # Architecture & Documentation
├── public/                  # Static assets
│   ├── index.html           # HTML Entry Point
│   └── manifest.json        # PWA Config
├── src/                     # Source Code
│   ├── assets/              # Images, Fonts
│   ├── components/          # React Components
│   │   ├── SubmitTicket.js  # Feature: Submission
│   │   ├── TrackTickets.js  # Feature: Tracking
│   │   └── AllTicketsPeek.js# Feature: Activity
│   ├── App.css              # Component Styles
│   ├── App.js               # Main Layout / Router
│   ├── config.js            # API Configuration
│   ├── index.css            # Global Theme
│   └── index.js             # React Root
├── package.json             # Dependencies
└── README.md                # Project Guide
```

### Architectural Boundaries

**API Boundaries:**
-   **External**: All network calls exit via `src/config.js` defined endpoints.
-   **Internal Service**: Components call `axios` directly (for now) but should ideally move to `src/services/api.js` if complexity grows.

**Component Boundaries:**
-   **App.js**: Owns Layout and global routing logic.
-   **Feature Components**: Own their own state and form validation logic. *No shared state between Submit and Track currently.*

### Requirements to Structure Mapping

**Functional Requirements Mapping:**
-   **Ticket Submission**: Lives entirely in `src/components/SubmitTicket.js`.
-   **Ticket Tracking**: Lives entirely in `src/components/TrackTickets.js`.
-   **Live Activity**: Lives entirely in `src/components/AllTicketsPeek.js`.

**Cross-Cutting Concerns:**
-   **Configuration**: `src/config.js`
-   **Styling**: `src/index.css` (Global) + `src/App.css` (Layout).

### Integration Points

**Data Flow:**
1.  **User Input** → Component State (`useState`).
2.  **Submission** → Axios POST → Strapi API.
3.  **Response** → Component State (Success/Error) → UI Feedback.

**External Integrations:**
-   **Backend**: Strapi (REST API).
-   **Analytics**: (None currently, but would live in `index.js`).

## Architecture Validation Results

### Coherence Validation ✅
-   **Decision Compatibility**: Strong. React 19 runs perfectly on the CRA/Webpack foundation. Vercel deployment is standard.
-   **Pattern Consistency**: Naming (Pascal/Camel) follows standard React community conventions.
-   **Structure Alignment**: Directory structure matches standard CRA scaffolding, easing developer onboarding.

### Requirements Coverage Validation ✅
-   **Ticket Submission**: Supported by `SubmitTicket.js` + Axios POST pattern.
-   **Tracking**: Supported by `TrackTickets.js` + Email Filter API decision.
-   **Activity Feed**: Supported by `AllTicketsPeek.js` + Local State decision.
-   **Responsive UI**: Supported by CSS Variables + Media Queries decision (implied in Styling).

### Gap Analysis Results
-   **Testing Strategy**: Only Unit Tests (Jest/RTL) defined. E2E testing is a future enhancement.
-   **Auth**: No user accounts (by design).

### Architecture Completeness Checklist
**✅ Requirements Analysis** ([x] Context Analyzed, [x] Scale Assessed)
**✅ Architectural Decisions** ([x] Stack Specified, [x] Integration Defined)
**✅ Implementation Patterns** ([x] Naming Rules, [x] Error Patterns)
**✅ Project Structure** ([x] Directory Tree, [x] component Mapping)

### Architecture Readiness Assessment
**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High
**Key Strengths:** Simplicity, Established Patterns, Zero-config Deployment.

### Implementation Handoff
**First Implementation Priority:**
Confirm `src/config.js` correctly points to the specific environment APIs (Local vs Render) before proceeding with feature updates.
