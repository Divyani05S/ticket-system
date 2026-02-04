---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['project-overview.md', 'reference-architecture.md']
workflowType: 'architecture'
project_name: 'strapi-backend'
user_name: 'Div'
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
1. **Ticket CRUD Operations**: Create, Read, Update, Delete support tickets via REST API
2. **Data Persistence**: Store ticket data with schema enforcement (title, description, email, priority, status, assigned_to)
3. **Admin Panel Access**: Strapi admin interface for content management
4. **Public API Access**: Allow frontend applications to interact with ticket endpoints

**Non-Functional Requirements:**
1. **Environment Flexibility**: Support both development (SQLite) and production (PostgreSQL) databases
2. **Security**: Role-based access control via users-permissions plugin
3. **Deployment**: Compatible with Render PaaS platform
4. **Maintainability**: Configuration-over-code approach for easy schema modifications
5. **Reliability**: SSL-enabled database connections for production

**Scale & Complexity:**
The project complexity is **Low-Medium**. It is a focused API backend without complex business logic or heavy computational needs.

- **Primary domain**: Backend API (Headless CMS)
- **Complexity level**: Low-Medium
- **Estimated architectural components**: 3-5 (Content Type, Controllers, Services, Config Layer, Database Layer)

### Technical Constraints & Dependencies

1. **Framework Lock-in**: Strapi v5 architecture (Plugin-based, EntityService pattern)
2. **Database Compatibility**: Must support both SQLite (dev) and PostgreSQL (prod) via Knex.js
3. **Node.js Version**: Requires Node.js >=20.x
4. **Deployment Platform**: Render-specific configuration (DATABASE_URL, SSL settings)
5. **TypeScript**: Core language for configuration and extensions

### Cross-Cutting Concerns Identified

1. **Configuration Management**: Environment-aware settings (database, server, admin)
2. **Authentication & Authorization**: Public vs Authenticated access patterns
3. **API Response Formatting**: Strapi v5 wrapper structure (data/meta envelope)
4. **Error Handling**: Strapi default error responses + custom controller logic
5. **Database Migrations**: Schema changes via `schema.json` modifications

## Base Architecture / Starter Evaluation

### Primary Technology Domain
**Brownfield Backend API** (Existing Project)

### Current Foundation Analysis
The project is built on **Strapi v5** (Headless CMS framework).

**Rationale for Retaining:**
- **Stability**: The existing codebase is functional and deployed to production (Render)
- **Framework Fit**: Strapi's plugin-based architecture perfectly matches the requirements (simple CRUD API for tickets)
- **Configuration-over-Code**: Schema-driven development reduces boilerplate and maintenance overhead
- **Built-in Features**: Admin panel, RBAC, and REST API generation are included out-of-box

**Architectural Decisions Provided by Current Setup:**

**Language & Runtime:**
- **TypeScript** for configuration files and custom logic
- **Node.js >=20.x** runtime environment

**Build Tooling:**
- **Strapi CLI** (`strapi build`, `strapi develop`, `strapi start`)
- Webpack bundling for admin panel
- TypeScript compilation handled by Strapi

**Code Organization:**
- **Monolithic Backend**: All code in `src/`
- **Feature-by-Content-Type**: Each entity (e.g., `ticket`) gets its own folder with controllers/services/routes
- **Config-Driven**: Environment-specific settings in `config/` directory

**Database Layer:**
- **Knex.js** ORM (abstracted by Strapi's EntityService)
- **Migration-free**: Schema changes via `schema.json` modifications

**API Design:**
- **RESTful** endpoints auto-generated from content types
- **Strapi v5 Response Format**: `{ data: {...}, meta: {...} }` envelope

**Note:** No migration needed - architecture is already established and production-ready.

## Core Architectural Decisions

### Data Architecture

**Database Selection:**
- **Production**: PostgreSQL 8.18+ (Managed by Render)
- **Development**: SQLite 3.x (Local fallback)
- **Rationale**: Environment-aware switching via `config/database.ts` allows local dev without external dependencies

**Data Validation Strategy:**
- **Primary**: Strapi schema.json validation (type checking, required fields)
- **Secondary**: Light controller-level validation for business rules (e.g., email format)
- **Rationale**: Leverages Strapi's built-in validation while allowing custom logic when needed

**Data Modeling Approach:**
- **Pattern**: Content-Type driven (declarative `schema.json` files)
- **Migration**: Schema changes applied automatically on server restart
- **Rationale**: Configuration-over-code reduces boilerplate and maintenance

### Authentication & Security

**Authentication Method:**
- **Admin**: JWT-based (Strapi admin panel)
- **Public API**: No authentication required for ticket submission
- **Rationale**: Matches transactional use case (no user accounts needed)

**Authorization Pattern:**
- **Public Endpoints**: `POST /api/tickets` (create), `GET /api/tickets?filters[email][$eq]=...` (read own)
- **Authenticated Endpoints**: Admin panel access only
- **Rationale**: Public can submit and track their own tickets; staff manages via admin

**API Security:**
- **CORS**: Configured in `config/middlewares.ts` to allow frontend origin
- **Rate Limiting**: Deferred to Render platform level (future: implement custom middleware)
- **Data Encryption**: SSL/TLS for database connections in production

### API & Communication Patterns

**API Protocol:**
- **Style**: REST (Strapi default)
- **Response Format**: Strapi v5 envelope (`{ data: {...}, meta: {...} }`)
- **Versioning**: Not implemented (single version API for MVP)

**Error Handling:**
- **Strategy**: Strapi default error responses
- **Logging**: Console logging (development), structured logs (production)
- **Monitoring**: Deferred (future: Sentry integration)

**API Documentation:**
- **Approach**: Strapi auto-generated REST API documentation
- **Access**: Available via admin panel

### Infrastructure & Deployment

**Hosting Strategy:**
- **Platform**: Render (PaaS)
- **Database**: Render-managed PostgreSQL
- **Static Assets**: Local storage (ephemeral) - future: S3/Cloudinary

**CI/CD Pipeline:**
- **Trigger**: Git push to main branch
- **Build**: `npm install && npm run build`
- **Start**: `npm run start`
- **Rationale**: Render auto-deploys from GitHub

**Environment Configuration:**
- **Required Variables**: `DATABASE_URL`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `NODE_ENV`
- **Management**: `.env` (local), Render dashboard (production)

**Scaling Strategy:**
- **Current**: Single instance (sufficient for MVP)
- **Future**: Horizontal scaling via Render (if needed)

### Decision Impact Analysis

**Implementation Sequence:**
1. Validate environment variables are set correctly
2. Confirm public access permissions on ticket endpoints
3. Test email-based filtering for ticket tracking
4. Verify CORS configuration for frontend integration

**Cross-Component Dependencies:**
- Database configuration affects both local development and production deployment
- API permissions must align with frontend expectations (public submission)
- Environment variables must be synchronized between local `.env` and Render dashboard

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Content-Type Naming:**
- **Folder Names**: Lowercase singular (e.g., `ticket`, not `Ticket` or `tickets`)
- **Schema singularName**: Lowercase singular (`"singularName": "ticket"`)
- **Schema pluralName**: Lowercase plural (`"pluralName": "tickets"`)
- **Rationale**: Matches Strapi CLI conventions

**API & Data:**
- **Schema Fields**: Use `snake_case` for field names (`curr_status`, not `currentStatus`)
- **API Endpoints**: Auto-generated by Strapi (`/api/tickets`)
- **Query Parameters**: Use Strapi's filter syntax (`filters[email][$eq]=...`)
- **Rationale**: Consistency with existing `ticket` schema

**Code Naming:**
- **Controllers/Services**: Use Strapi factory functions (`createCoreController`, `createCoreService`)
- **Custom Functions**: `camelCase` for TypeScript/JavaScript code
- **Config Files**: `kebab-case` for filenames (`database.ts`, `server.ts`)

### Structure Patterns

**Project Organization:**
- **Content Types**: `src/api/{content-type}/content-types/{content-type}/schema.json`
- **Controllers**: `src/api/{content-type}/controllers/{content-type}.ts`
- **Services**: `src/api/{content-type}/services/{content-type}.ts`
- **Routes**: `src/api/{content-type}/routes/{content-type}.ts`
- **Rationale**: Strapi's enforced structure

**Configuration:**
- **Environment Config**: All environment-specific settings in `config/` directory
- **Secrets**: Store in `.env`, never commit
- **Database Config**: Use `config/database.ts` for connection logic

### Communication Patterns

**API Response Format:**
- **Standard Strapi Envelope**: Always return `{ data: {...}, meta: {...} }`
- **Custom Responses**: If overriding controller, maintain envelope structure
- **Error Responses**: Use Strapi's built-in error handling (don't create custom error formats)

**Data Exchange:**
- **Field Names**: Preserve schema field names in API responses (`curr_status`, not `currentStatus`)
- **Date Format**: ISO 8601 strings (Strapi default)
- **Null Handling**: Use `null` for missing optional fields

### Process Patterns

**Error Handling:**
- **Strategy**: Let Strapi handle errors by default
- **Custom Validation**: Add in controller before calling `super.create()` or `super.update()`
- **Logging**: Use `strapi.log.error()` for server-side errors

**Schema Modifications:**
- **Process**: Edit `schema.json` → restart server → schema auto-migrates
- **Never**: Manually create database migrations
- **Rationale**: Strapi manages schema sync automatically

### Enforcement Guidelines

**All AI Agents MUST:**
1. **Use Strapi Factory Functions**: Never create controllers/services from scratch
2. **Preserve Schema Field Names**: Don't transform `snake_case` to `camelCase` in responses
3. **Follow Content-Type Structure**: All new entities must follow `src/api/{name}/` pattern
4. **Use Environment Variables**: Never hardcode URLs, secrets, or environment-specific values
5. **Respect Strapi Conventions**: Don't fight the framework - use its patterns

**Anti-Patterns:**
- ❌ Creating custom API response wrappers (Strapi provides this)
- ❌ Manual database migrations (use schema.json)
- ❌ Hardcoding database connections (use config/database.ts)
- ❌ Custom auth systems (use users-permissions plugin)

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
strapi-backend/
├── .env                      # Environment variables (local)
├── .env.example              # Environment template
├── .gitignore                # Git exclusions
├── .strapi/                  # Strapi build cache
├── .tmp/                     # Temporary files
├── package.json              # Dependencies & scripts
├── package-lock.json         # Dependency lock file
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
├── BMAD/                     # AI Agent Framework
│   ├── _bmad/                # Agent tools & workflows
│   └── _bmad-output/         # Generated documentation
│       ├── project-overview.md
│       ├── architecture.md
│       ├── api-contracts.md
│       └── ...
├── config/                   # [CRITICAL] Server Configuration
│   ├── admin.ts              # Admin panel settings
│   ├── api.ts                # API response config
│   ├── database.ts           # [CRITICAL] DB connection logic
│   ├── middlewares.ts        # Middleware stack (CORS, etc.)
│   └── server.ts             # Host/port configuration
├── database/                 # SQLite database (dev only)
│   └── data.db
├── dist/                     # Build output (production)
├── public/                   # Static assets
│   ├── uploads/              # Media library storage
│   └── robots.txt
├── src/                      # [CRITICAL] Application Source
│   ├── admin/                # Admin panel customizations
│   ├── api/                  # Business logic modules
│   │   └── ticket/           # [FEATURE] Ticket Management
│   │       ├── content-types/
│   │       │   └── ticket/
│   │       │       └── schema.json  # [CRITICAL] Data model
│   │       ├── controllers/
│   │       │   └── ticket.ts        # Request handlers
│   │       ├── routes/
│   │       │   └── ticket.ts        # API endpoints
│   │       └── services/
│   │           └── ticket.ts        # Business logic
│   └── index.ts              # Application entry point
└── types/                    # TypeScript type definitions
    └── generated/            # Strapi auto-generated types
```

### Architectural Boundaries

**API Boundaries:**
- **External**: All network requests enter via `/api/*` endpoints (auto-generated by Strapi)
- **Internal Service**: Controllers → Services → EntityService → Database
- **Admin Panel**: Separate authentication boundary (`/admin`)

**Component Boundaries:**
- **Content Types**: Each entity (`ticket`) is isolated in `src/api/{entity}/`
- **Configuration**: Environment-specific logic lives in `config/`
- **No Cross-Entity Dependencies**: Ticket module is self-contained

**Data Boundaries:**
- **Database Access**: All queries go through Strapi's EntityService (no raw SQL)
- **Schema Definition**: `schema.json` is the single source of truth
- **Environment Isolation**: SQLite (dev) vs PostgreSQL (prod) handled by `config/database.ts`

### Requirements to Structure Mapping

**Functional Requirements Mapping:**
1. **Ticket CRUD Operations** → `src/api/ticket/` (controllers, services, routes)
2. **Data Persistence** → `src/api/ticket/content-types/ticket/schema.json`
3. **Admin Panel Access** → Strapi built-in (`/admin`)
4. **Public API Access** → Auto-generated REST endpoints (`/api/tickets`)

**Cross-Cutting Concerns:**
- **Authentication & Authorization** → `users-permissions` plugin (Strapi core)
- **CORS Configuration** → `config/middlewares.ts`
- **Environment Variables** → `.env` (local), Render dashboard (prod)
- **Error Handling** → Strapi default middleware

### Integration Points

**Internal Communication:**
- **Request Flow**: HTTP Request → Router → Controller → Service → EntityService → Database
- **No Inter-Module Communication**: Single content-type architecture (no dependencies)

**External Integrations:**
- **Frontend**: React app consumes `/api/tickets` endpoints
- **Database**: PostgreSQL (Render-managed) via `DATABASE_URL`
- **Admin Users**: Access via `/admin` (JWT-based)

**Data Flow:**
1. **Ticket Submission**: `POST /api/tickets` → Controller validation → EntityService.create() → PostgreSQL
2. **Ticket Tracking**: `GET /api/tickets?filters[email][$eq]=...` → EntityService.find() → PostgreSQL → JSON response
3. **Admin Management**: Admin Panel → Strapi Content Manager → EntityService → PostgreSQL

### File Organization Patterns

**Configuration Files:**
- **Location**: `config/` directory
- **Pattern**: One file per concern (`database.ts`, `server.ts`, etc.)
- **Environment Handling**: Use `process.env.NODE_ENV` for conditional logic

**Source Organization:**
- **Pattern**: Feature-by-Content-Type (`src/api/{entity}/`)
- **Isolation**: Each content-type is self-contained
- **Extensibility**: Add new entities by creating new folders in `src/api/`

**Asset Organization:**
- **Uploads**: `public/uploads/` (local provider)
- **Static Files**: `public/` (robots.txt, etc.)
- **Note**: Uploads are ephemeral on Render (use S3 for persistence)

### Development Workflow Integration

**Development Server:**
- **Command**: `npm run develop`
- **Port**: 1337 (configurable in `config/server.ts`)
- **Hot Reload**: Enabled for schema changes and code updates

**Build Process:**
- **Command**: `npm run build`
- **Output**: `dist/` directory
- **Includes**: Admin panel bundle + TypeScript compilation

**Deployment:**
- **Platform**: Render
- **Trigger**: Git push to main branch
- **Build**: `npm install && npm run build`
- **Start**: `npm run start`
- **Environment**: Variables set in Render dashboard

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:** STRONG
- Strapi v5 + TypeScript + PostgreSQL + Render is a proven, production-ready stack
- All technology versions are compatible and well-supported
- Environment-aware database switching is natively supported by Knex.js

**Pattern Consistency:** EXCELLENT
- Naming conventions align with Strapi CLI standards
- Structure patterns follow framework conventions
- No conflicting patterns identified across decisions

**Structure Alignment:** PERFECT
- Project structure is enforced by Strapi framework
- Boundaries are clearly defined and respected
- Configuration isolation supports environment flexibility

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
- ✅ Ticket CRUD Operations → `src/api/ticket/` module
- ✅ Data Persistence → `schema.json` + PostgreSQL
- ✅ Admin Panel Access → Strapi built-in
- ✅ Public API Access → Auto-generated REST endpoints

**Non-Functional Requirements Coverage:**
- ✅ Environment Flexibility → `config/database.ts`
- ✅ Security → users-permissions + CORS
- ✅ Deployment → Render-compatible
- ✅ Maintainability → Configuration-over-code
- ✅ Reliability → SSL database connections

### Implementation Readiness Validation ✅

**Decision Completeness:** HIGH
- All critical decisions documented with versions
- Technology stack fully specified
- Integration patterns clearly defined

**Structure Completeness:** COMPLETE
- Full directory tree documented
- All critical files identified
- Integration points clearly specified

**Pattern Completeness:** STRONG
- Naming conventions comprehensive
- Structure patterns align with framework
- Communication patterns clearly specified
- Process patterns documented

### Gap Analysis Results

**Critical Gaps:** NONE

**Nice-to-Have Gaps:**
1. **Testing Strategy**: Unit/integration test patterns not defined (acceptable for MVP)
2. **Monitoring**: Sentry integration deferred to post-launch
3. **Asset Storage**: Local storage is ephemeral on Render (recommend S3 for production uploads)

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low-Medium)
- [x] Technical constraints identified (Strapi v5, Node >=20, Render)
- [x] Cross-cutting concerns mapped (Auth, CORS, Error Handling)

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (Strapi 5.34.0, PostgreSQL 8.18+)
- [x] Integration patterns defined (REST API, EntityService)
- [x] Security considerations addressed (RBAC, SSL)

**✅ Implementation Patterns**
- [x] Naming conventions established (lowercase singular, snake_case fields)
- [x] Structure patterns defined (Feature-by-Content-Type)
- [x] Communication patterns specified (Strapi v5 envelope)
- [x] Process patterns documented (Error handling, schema modifications)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established (Content Types, Config, Admin)
- [x] Integration points mapped (Frontend, Database, Admin)
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
- Framework-enforced consistency (Strapi conventions prevent agent conflicts)
- Simple, focused architecture (single content-type, no complex dependencies)
- Production-proven stack (Strapi v5 + PostgreSQL + Render)
- Clear boundaries and patterns

**Areas for Future Enhancement:**
- Add automated testing (Jest + Supertest for API tests)
- Implement monitoring (Sentry for error tracking)
- Migrate to S3 for persistent file storage
- Add rate limiting middleware for public endpoints

### Implementation Handoff

**AI Agent Guidelines:**
1. **Follow Strapi Conventions**: Use factory functions, respect folder structure
2. **Preserve Field Names**: Keep `snake_case` in schema and API responses
3. **Use Environment Variables**: Never hardcode secrets or URLs
4. **Respect Framework Patterns**: Don't create custom response wrappers or auth systems
5. **Refer to This Document**: For all architectural questions and decisions

**First Implementation Priority:**
Validate environment variables are correctly set in both local `.env` and Render dashboard before making any code changes.
