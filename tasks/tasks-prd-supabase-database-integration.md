# Tasks: Supabase Database Integration for htstarter

## Relevant Files

- `db/schema.ts` - Database schema definitions using Drizzle ORM
- `db/index.ts` - Database connection and client setup
- `db/seed.ts` - Database seeding script using mock data
- `drizzle.config.ts` - Drizzle ORM configuration
- `app/api/projects/route.ts` - Projects API endpoints (GET, POST)
- `app/api/projects/[id]/route.ts` - Individual project API endpoints (GET, PUT, DELETE)
- `app/api/users/route.ts` - Users API endpoints (GET)
- `app/api/users/[id]/route.ts` - Individual user API endpoints (GET, PUT)
- `app/api/projects/[id]/vote/route.ts` - Project voting API endpoints (POST, DELETE)
- `app/api/projects/[id]/comments/route.ts` - Project comments API endpoints (GET, POST)
- `app/api/comments/[id]/route.ts` - Individual comment API endpoints (DELETE)
- `lib/db.ts` - Database utility functions and types
- `components/ProjectList.tsx` - Update to use API instead of mock data
- `components/ProjectCard.tsx` - Update to use API instead of mock data
- `components/SubmitForm.tsx` - Update to use API instead of mock data
- `app/profile/[id]/page.tsx` - Update to use API instead of mock data
- `app/project/[id]/page.tsx` - Update to use API instead of mock data
- `middleware.ts` - Update to handle authentication for API routes
- `types/database.ts` - TypeScript types for database entities
- `lib/auth.ts` - Authentication utilities for Clerk integration

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- Follow the same database setup pattern as the color-book project for consistency.
- All API endpoints should include proper error handling and authentication checks.
- Database migrations should be created using Drizzle Kit for schema changes.

## Tasks

- [ ] 1.0 Database Setup and Configuration

  - [ ] 1.1 Install required dependencies (drizzle-orm, postgres, drizzle-kit, @types/pg)
  - [ ] 1.2 Create drizzle.config.ts with PostgreSQL configuration
  - [ ] 1.3 Set up environment variables for database connection (DATABASE_URL)
  - [ ] 1.4 Create db/index.ts for database connection setup
  - [ ] 1.5 Configure database connection with proper error handling
  - [ ] 1.6 Test database connectivity

- [ ] 2.0 Core Database Schema Implementation

  - [ ] 2.1 Create db/schema.ts with users table schema
  - [ ] 2.2 Add projects table schema with foreign key to users
  - [ ] 2.3 Add votes table schema with user and project foreign keys
  - [ ] 2.4 Add comments table schema with user and project foreign keys
  - [ ] 2.5 Add categories table schema for project categories
  - [ ] 2.6 Create database migration using Drizzle Kit
  - [ ] 2.7 Apply migration to Supabase database
  - [ ] 2.8 Create types/database.ts with TypeScript types for all entities

- [ ] 3.0 API Endpoints Development

  - [ ] 3.1 Create app/api/projects/route.ts (GET, POST endpoints)
  - [ ] 3.2 Create app/api/projects/[id]/route.ts (GET, PUT, DELETE endpoints)
  - [ ] 3.3 Create app/api/users/route.ts (GET endpoint)
  - [ ] 3.4 Create app/api/users/[id]/route.ts (GET, PUT endpoints)
  - [ ] 3.5 Create app/api/projects/[id]/vote/route.ts (POST, DELETE endpoints)
  - [ ] 3.6 Create app/api/projects/[id]/comments/route.ts (GET, POST endpoints)
  - [ ] 3.7 Create app/api/comments/[id]/route.ts (DELETE endpoint)
  - [ ] 3.8 Implement proper error handling for all API endpoints
  - [ ] 3.9 Add input validation for all API endpoints

- [ ] 4.0 Authentication Integration

  - [ ] 4.1 Create lib/auth.ts with Clerk authentication utilities
  - [ ] 4.2 Implement user ID mapping between Clerk and database
  - [ ] 4.3 Add authentication middleware for protected API routes
  - [ ] 4.4 Update middleware.ts to handle API route authentication
  - [ ] 4.5 Implement authorization checks for user-specific operations
  - [ ] 4.6 Add automatic user creation on first authentication

- [ ] 5.0 Frontend Integration and Data Migration
  - [ ] 5.1 Create db/seed.ts using data from data/mockData.ts
  - [ ] 5.2 Run seed script to populate database with initial data
  - [ ] 5.3 Update components/ProjectList.tsx to fetch from API
  - [ ] 5.4 Update components/ProjectCard.tsx to use API data
  - [ ] 5.5 Update components/SubmitForm.tsx to submit to API
  - [ ] 5.6 Update app/profile/[id]/page.tsx to fetch user data from API
  - [ ] 5.7 Update app/project/[id]/page.tsx to fetch project data from API
  - [ ] 5.8 Add loading states for all API calls
  - [ ] 5.9 Add error handling for API failures in components
  - [ ] 5.10 Implement optimistic updates for votes and comments
  - [ ] 5.11 Remove mock data dependencies from all components
