# PRD: Supabase Database Integration for htstarter

## Introduction/Overview

This PRD outlines the integration of Supabase database with the htstarter project to replace the current mock data system with a persistent, scalable database solution. The integration will follow the same architectural pattern as the color-book project, using Drizzle ORM, Clerk authentication, and RESTful API endpoints.

**Problem:** Currently, htstarter uses static mock data stored in `data/mockData.ts`, which limits scalability, prevents real user interactions, and makes the application non-persistent.

**Goal:** Implement a full database integration that enables user authentication, data persistence, and dynamic content management while maintaining the existing UI/UX.

## Goals

1. **Replace mock data with persistent database storage** - Migrate all entities (users, projects, votes, comments) to Supabase
2. **Integrate Clerk authentication** - Link user actions to authenticated users
3. **Create RESTful API endpoints** - Provide CRUD operations for all entities
4. **Implement database migrations and seeding** - Enable proper database schema management
5. **Maintain existing functionality** - Ensure all current features work with the new database
6. **Enable user-specific interactions** - Allow authenticated users to vote, comment, and submit projects

## User Stories

1. **As a developer**, I want to run database migrations so that I can deploy schema changes safely
2. **As a developer**, I want to seed the database with initial data so that I can test the application with realistic data
3. **As an authenticated user**, I want to submit my project so that it gets stored in the database and becomes visible to other users
4. **As an authenticated user**, I want to vote on projects so that my vote is recorded and persists across sessions
5. **As an authenticated user**, I want to comment on projects so that I can provide feedback and engage with the community
6. **As a user**, I want to view projects so that I can discover new applications and tools
7. **As a user**, I want to filter and search projects so that I can find relevant content quickly

## Functional Requirements

### Database Schema Requirements

1. **Users table** - Store user profiles with Clerk user ID, name, avatar, bio, location, joined date, experience, website, GitHub, Twitter, skills array, project count, follower count, following count
2. **Projects table** - Store project information including title, description, image URL, author ID (foreign key to users), technologies array, votes count, comments count, category, live URL, GitHub URL, creation date, features array, tech details, challenges
3. **Votes table** - Store user votes on projects with user ID, project ID, and vote timestamp
4. **Comments table** - Store user comments on projects with user ID, project ID, comment text, and timestamp
5. **Categories table** - Store project categories (lovable, cursor, chef, convex, bolt, replit)

### API Endpoints Requirements

6. **GET /api/projects** - Retrieve all projects with optional filtering and pagination
7. **GET /api/projects/[id]** - Retrieve a specific project by ID
8. **POST /api/projects** - Create a new project (authenticated users only)
9. **PUT /api/projects/[id]** - Update a project (project owner only)
10. **DELETE /api/projects/[id]** - Delete a project (project owner only)
11. **GET /api/users** - Retrieve all users
12. **GET /api/users/[id]** - Retrieve a specific user by ID
13. **PUT /api/users/[id]** - Update user profile (authenticated user only)
14. **POST /api/projects/[id]/vote** - Vote on a project (authenticated users only)
15. **DELETE /api/projects/[id]/vote** - Remove vote from a project (authenticated users only)
16. **GET /api/projects/[id]/comments** - Retrieve comments for a project
17. **POST /api/projects/[id]/comments** - Add a comment to a project (authenticated users only)
18. **DELETE /api/comments/[id]** - Delete a comment (comment owner only)

### Authentication Requirements

19. **Clerk integration** - All user-specific actions must require authentication
20. **User ID mapping** - Map Clerk user IDs to internal user records
21. **Authorization checks** - Ensure users can only modify their own data

### Database Management Requirements

22. **Drizzle ORM setup** - Configure Drizzle with PostgreSQL dialect
23. **Migration system** - Create and manage database schema migrations
24. **Seed data** - Populate database with initial data from mock files
25. **Environment configuration** - Set up proper environment variables for database connection

## Non-Goals (Out of Scope)

- Real-time subscriptions or live updates
- Advanced search functionality with full-text search
- Image upload and storage (will use existing image URLs)
- Email notifications
- Social media integration beyond existing links
- Advanced analytics or reporting
- Multi-language support for database content
- Backup and recovery procedures

## Design Considerations

- **Maintain existing UI components** - All current components should work with the new API
- **Error handling** - Implement proper error responses for API endpoints
- **Loading states** - Add loading indicators for database operations
- **Optimistic updates** - Implement optimistic UI updates for votes and comments
- **Pagination** - Support pagination for large datasets
- **Type safety** - Maintain TypeScript types for all database entities

## Technical Considerations

- **Follow color-book pattern** - Use the same database setup structure as the color-book project
- **Drizzle ORM** - Use Drizzle for type-safe database operations
- **PostgreSQL** - Leverage Supabase's PostgreSQL database
- **Row Level Security (RLS)** - Implement RLS policies for data protection
- **Environment variables** - Use proper environment configuration for database URL
- **Error boundaries** - Implement error boundaries for database operation failures
- **Caching strategy** - Consider implementing caching for frequently accessed data

## Success Metrics

1. **Database connectivity** - 100% successful database connections
2. **API response times** - All API endpoints respond within 500ms
3. **Data integrity** - All CRUD operations maintain data consistency
4. **User authentication** - 100% of protected routes properly authenticate users
5. **Migration success** - All database migrations execute without errors
6. **Seed data accuracy** - All mock data successfully migrated to database
7. **Error rate** - Less than 1% error rate for database operations

## Implementation Phases

### Phase 1: Database Setup

- Install required dependencies (drizzle-orm, postgres, drizzle-kit)
- Configure Drizzle with Supabase connection
- Create database schema definitions
- Set up environment variables

### Phase 2: Core Entities

- Implement users table and API
- Implement projects table and API
- Create basic CRUD operations

### Phase 3: User Interactions

- Implement votes table and API
- Implement comments table and API
- Add authentication checks

### Phase 4: Data Migration

- Create seed script using mock data
- Test data integrity
- Update frontend components to use API

## Open Questions

1. Should we implement soft deletes for projects and comments?
2. Do we need to implement rate limiting for API endpoints?
3. Should we add indexes for frequently queried fields?
4. Do we need to implement data validation beyond TypeScript types?
5. Should we add audit logging for data changes?
6. Do we need to implement data export functionality?

## Dependencies

- Supabase project (already available)
- Clerk authentication (already configured)
- Drizzle ORM and related packages
- PostgreSQL client
- Environment variables for database connection

## Risk Assessment

- **Data migration complexity** - Mock data structure may need adjustments for database schema
- **Authentication integration** - Need to ensure proper mapping between Clerk and database users
- **Performance impact** - Database queries may be slower than static mock data
- **Schema evolution** - Future changes to data structure will require migrations

## Acceptance Criteria

1. All existing functionality works with the new database
2. Users can authenticate and perform user-specific actions
3. Projects can be created, read, updated, and deleted
4. Votes and comments work correctly
5. Database migrations can be run successfully
6. Seed data populates the database correctly
7. All API endpoints return proper responses
8. Error handling works for all edge cases
9. TypeScript types are maintained throughout
10. Performance is acceptable for all operations
