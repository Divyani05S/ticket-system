# Contribution Guide

## Getting Started
Welcome to the Ticketing System! To contribute, please ensure you have a local development environment set up as per the [Development Guide](./development-guide.md).

## Code Standards

### Frontend (React)
- Use **Functional Components** with Hooks.
- Keep components small and focused.
- Maintain the **Design System**; use CSS variables from `index.css` for all colors and spacing.
- Ensure all forms have client-side validation before hitting the API.

### Backend (Strapi)
- When adding new fields, document them in `data-models.md`.
- Keep the "Public" role permissions updated if new endpoints are added.

## Git Workflow
1. **Branching**: Use descriptive branch names (`feature/new-login`, `fix/schema-typo`).
2. **Commits**: Follow conventional commits (e.g., `feat: add priority icons`, `fix: update email regex`).
3. **Drafting**: Mark incomplete work with "WIP" or "Draft" in the PR title.

## Quality Checklist
- [ ] No hardcoded API URLs (use `.env`).
- [ ] Console logs removed from production code.
- [ ] All new components tested for responsiveness.
- [ ] Documentation updated to reflect changes.

## Reporting Issues
If you find a bug (like a schema typo!), please document it in the [Current State](../.bmad/context/current_state.md) file.
