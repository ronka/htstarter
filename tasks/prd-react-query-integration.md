# Product Requirements Document: React Query Integration

## Introduction/Overview

This PRD outlines the implementation of React Query (TanStack Query) to replace all direct fetch calls throughout the application. Currently, the app uses manual fetch calls in components like `/profile/[id]`, `/project/[id]`, and `/submit` pages. This implementation will provide better caching, loading states, error handling, and developer experience while maintaining the existing functionality.

**Problem:** The application currently uses manual fetch calls scattered across components, leading to inconsistent loading states, no caching, and poor error handling.

**Goal:** Implement React Query to centralize all backend requests, providing consistent data fetching patterns, automatic caching, and better user experience.

## Goals

1. **Centralize Data Fetching:** Replace all direct fetch calls with React Query hooks
2. **Improve User Experience:** Implement skeleton loading states and better error handling
3. **Enable Caching:** Provide automatic caching for all API responses
4. **Support CRUD Operations:** Implement queries for GET requests and mutations for POST/PUT/DELETE
5. **Create Reusable Hooks:** Develop custom hooks following React Query best practices
6. **Maintain TypeScript Support:** Ensure full type safety across all queries and mutations

## User Stories

1. **As a user**, I want to see skeleton loading states while data is being fetched, so that I know the app is working and not frozen.

2. **As a user**, I want to see cached data immediately when navigating between pages, so that the app feels fast and responsive.

3. **As a user**, I want to see clear error messages when data fails to load, so that I understand what went wrong.

4. **As a developer**, I want to use consistent data fetching patterns across the app, so that I can maintain and extend the codebase easily.

5. **As a developer**, I want to have type-safe API calls, so that I can catch errors at compile time.

## Functional Requirements

### 1. React Query Setup

- The system must configure React Query provider in the root layout
- The system must set up default query client with standard configuration
- The system must implement React Query DevTools for development environment

### 2. Query Implementation (GET Requests)

- The system must create custom hooks for all existing API endpoints:
  - `useProjects()` - for fetching project lists with filtering/pagination
  - `useProject(id)` - for fetching individual project details
  - `useUsers()` - for fetching user lists
  - `useUser(id)` - for fetching individual user profiles
  - `useComments(projectId)` - for fetching project comments
  - `useHealth()` - for health check endpoint

### 3. Mutation Implementation (POST/PUT/DELETE)

- The system must create custom mutation hooks for all write operations:
  - `useCreateProject()` - for creating new projects
  - `useUpdateProject()` - for updating existing projects
  - `useDeleteProject()` - for deleting projects
  - `useVoteProject()` - for voting on projects
  - `useCreateComment()` - for adding comments
  - `useUpdateComment()` - for editing comments
  - `useDeleteComment()` - for deleting comments
  - `useUpdateUser()` - for updating user profiles

### 4. Loading States

- The system must implement skeleton loading components for all data-fetching scenarios
- The system must show skeleton loaders during initial data fetch
- The system must not show loading states during background refetches

### 5. Error Handling

- The system must handle errors at the component level
- The system must display user-friendly error messages using toast notifications
- The system must provide retry mechanisms for failed requests
- The system must handle network errors gracefully

### 6. Caching Strategy

- The system must cache all GET requests with default React Query settings
- The system must invalidate relevant caches after successful mutations
- The system must implement optimistic updates for voting and commenting

### 7. TypeScript Integration

- The system must provide full TypeScript support for all queries and mutations
- The system must define proper types for all API responses
- The system must ensure type safety in custom hooks

### 8. Custom Hooks Structure

- The system must create a dedicated `hooks/` directory for all React Query hooks
- The system must organize hooks by feature (projects, users, comments)
- The system must follow React Query best practices for hook naming and structure

## Non-Goals (Out of Scope)

- Real-time updates or WebSocket integration
- Advanced caching strategies beyond React Query defaults
- Global loading indicators or progress bars
- Offline support or service worker implementation
- Complex retry logic beyond React Query defaults
- Authentication token management (handled by Clerk)
- Background synchronization features

## Design Considerations

### Skeleton Loading Components

- Create reusable skeleton components for:
  - Project cards
  - User profile cards
  - Comment lists
  - Form inputs
- Use consistent animation and styling with existing design system

### Error States

- Implement error boundaries for critical components
- Use existing toast notification system for error messages
- Provide retry buttons for failed requests

### Loading States

- Show skeleton loaders during initial page loads
- Hide loading states during background refetches
- Maintain existing loading spinners for mutations

## Technical Considerations

### Dependencies

- React Query is already installed (`@tanstack/react-query`)
- No additional dependencies required

### File Structure

```
hooks/
  queries/
    useProjects.ts
    useProject.ts
    useUsers.ts
    useUser.ts
    useComments.ts
    useHealth.ts
  mutations/
    useCreateProject.ts
    useUpdateProject.ts
    useDeleteProject.ts
    useVoteProject.ts
    useCreateComment.ts
    useUpdateComment.ts
    useDeleteComment.ts
    useUpdateUser.ts
  types/
    api.ts
```

### Query Keys Strategy

- Use consistent query key patterns:
  - `['projects', { page, limit, category, search }]`
  - `['project', id]`
  - `['users', { page, limit }]`
  - `['user', id]`
  - `['comments', projectId]`

### Cache Invalidation

- Invalidate project lists after project creation/update/deletion
- Invalidate user data after profile updates
- Invalidate comments after comment mutations
- Use optimistic updates for voting

## Success Metrics

1. **Performance:** Reduce perceived loading times by 50% through caching
2. **Developer Experience:** Reduce boilerplate code by 70% in data fetching components
3. **User Experience:** Eliminate loading spinners during navigation between cached pages
4. **Error Handling:** Improve error message clarity and consistency
5. **Code Quality:** Achieve 100% TypeScript coverage for all API interactions

## Open Questions

1. Should we implement infinite scrolling for project lists, or keep pagination?
2. Do we need to handle concurrent mutations (e.g., multiple users voting simultaneously)?
3. Should we implement query prefetching for common navigation paths?
4. Do we need to handle rate limiting for API calls?
5. Should we implement query persistence across browser sessions?

## Implementation Priority

### Phase 1: Core Setup

1. Configure React Query provider
2. Create basic query hooks for projects and users
3. Implement skeleton loading components

### Phase 2: Mutations

1. Create mutation hooks for CRUD operations
2. Implement optimistic updates for voting
3. Add proper cache invalidation

### Phase 3: Polish

1. Add error handling and retry logic
2. Implement remaining query hooks
3. Add TypeScript types and documentation
