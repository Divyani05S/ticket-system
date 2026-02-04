# Project Overview

## Description
The **Support Ticket System** is a professional, full-stack application designed to streamline customer support requests. It provides a seamless user experience for submitting issues, tracking progress, and viewing real-time activity dashboards.

## Core Value Proposition
- **Clarity**: Users can easily track their issues via their email.
- **Speed**: Ticket submission is fast with instant feedback.
- **Transparency**: The "Recent Activity" dashboard shows that help is actively being provided.

## Key Features
- **Premium Dark UI**: A modern aesthetic with glassmorphism and smooth animations.
- **Global Activity Peek**: A real-time drawer showing recent support requests.
- **Robust Searching**: Filter tickets by email to see historical data.

## Technology Stack Summary
- **Frontend**: React 19 (SPA)
- **Backend**: Strapi 5 (Headless CMS)
- **Database**: SQLite
- **Styling**: Vanilla CSS

## Business Logic
1. A user submits a ticket with a title, description, and priority.
2. The ticket is immediately available for tracking via the user's email address.
3. The dashboard reflects the new ticket as part of the "Recent Activity" feed.
4. (Internal) Support agents update ticket status from the Strapi Admin Panel.
