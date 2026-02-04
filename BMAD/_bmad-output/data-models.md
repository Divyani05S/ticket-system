# Data Models

## Strapi Content Types

### 1. Ticket (`collectionType`)
Primary entity for storing support requests.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **title** | string | Yes | Brief summary of the issue. |
| **description** | text | Yes | Detailed problem report. |
| **email** | email | No | User's contact email (used for tracking). |
| **priority** | enumeration | No | `Low`, `Meduim` (typo), `High`. |
| **curr_status** | enumeration | No | `Open`, `In Progress`, `Resolved`. |
| **assigned_to** | string | No | Name or ID of the assigned agent. |

## Database Schema (SQLite)
The data is stored in a `tickets` table with the following internal fields:
- `id`: Primary Key (Auto-increment).
- `createdAt`: ISO Timestamp.
- `updatedAt`: ISO Timestamp.
- `publishedAt`: ISO Timestamp (for Draft & Publish feature).

## Relationships
*Currently, the Ticket model is standalone. Future versions may link to a `User` or `Category` model.*

## Known Discrepancies
- **Enum Spelling**: The enumeration value for Medium is spelled `Meduim` in the Strapi schema. 
