# React Query Integration - Task List

## Relevant Files

- `app/layout.tsx` - Root layout with React Query provider configured
- `components/Providers.tsx` - Client-side React Query provider component
- `lib/query-client.ts` - Query client configuration with standard settings
- `hooks/queries/` - Directory for all query hooks (useProjects, useProject, useUsers, etc.)
- `hooks/mutations/` - Directory for all mutation hooks (useCreateProject, useUpdateProject, etc.)
- `hooks/types/api.ts` - TypeScript types for all API responses and requests
- `components/ui/skeleton.tsx` - Reusable skeleton loading components
- `components/ProjectCard.tsx` - Component that will use React Query hooks for data fetching
- `components/ProjectList.tsx` - Component that will use React Query hooks for project lists
- `app/profile/[id]/page.tsx` - Profile page that will use React Query hooks
- `app/project/[id]/page.tsx` - Project detail page that will use React Query hooks
- `app/submit/page.tsx` - Submit page that will use React Query mutations
- `components/SubmitForm.tsx` - Form component that will use React Query hooks for data fetching
- `lib/utils.ts` - Utility functions for API calls and error handling

### Notes

- React Query is already installed (`@tanstack/react-query`) so no additional dependencies are needed.

## Tasks

- [x] 1.0 React Query Provider Setup and Configuration

  - [x] 1.1 Configure React Query provider in root layout (`app/layout.tsx`)
  - [x] 1.2 Set up default query client with standard configuration (staleTime, cacheTime, retries)
  - [x] 1.3 Implement React Query DevTools for development environment
  - [x] 1.4 Create query client configuration file (`lib/query-client.ts`)
  - [x] 1.5 Test provider setup with a simple query to ensure proper configuration

- [ ] 2.0 Query Hooks Implementation (GET Requests)

  - [ ] 2.1 Create `hooks/queries/` directory structure
  - [ ] 2.2 Implement `useProjects()` hook with filtering and pagination support
  - [ ] 2.3 Implement `useProject(id)` hook for individual project details
  - [ ] 2.4 Implement `useUsers()` hook for user lists with pagination
  - [ ] 2.5 Implement `useUser(id)` hook for individual user profiles
  - [ ] 2.6 Implement `useComments(projectId)` hook for project comments
  - [ ] 2.7 Implement `useHealth()` hook for health check endpoint
  - [ ] 2.8 Add proper query key patterns following the defined strategy
  - [ ] 2.9 Add TypeScript types for all query responses

- [ ] 3.0 Mutation Hooks Implementation (POST/PUT/DELETE)

  - [ ] 3.1 Create `hooks/mutations/` directory structure
  - [ ] 3.2 Implement `useCreateProject()` mutation hook
  - [ ] 3.3 Implement `useUpdateProject()` mutation hook
  - [ ] 3.4 Implement `useDeleteProject()` mutation hook
  - [ ] 3.5 Implement `useVoteProject()` mutation hook with optimistic updates
  - [ ] 3.6 Implement `useCreateComment()` mutation hook
  - [ ] 3.7 Implement `useUpdateComment()` mutation hook
  - [ ] 3.8 Implement `useDeleteComment()` mutation hook
  - [ ] 3.9 Implement `useUpdateUser()` mutation hook
  - [ ] 3.10 Add proper cache invalidation for all mutations
  - [ ] 3.11 Add TypeScript types for all mutation requests and responses

- [ ] 4.0 Skeleton Loading Components and UI States

  - [ ] 4.1 Create reusable skeleton components in `components/ui/skeleton.tsx`
  - [ ] 4.2 Implement ProjectCard skeleton component
  - [ ] 4.3 Implement UserProfile skeleton component
  - [ ] 4.4 Implement CommentList skeleton component
  - [ ] 4.5 Implement FormInput skeleton component
  - [ ] 4.6 Add consistent animation and styling with existing design system
  - [ ] 4.7 Ensure skeleton components match the actual component dimensions

- [ ] 5.0 Error Handling and Toast Notifications

  - [ ] 5.1 Create error handling utilities in `lib/utils.ts`
  - [ ] 5.2 Implement error boundaries for critical components
  - [ ] 5.3 Add user-friendly error messages using existing toast system
  - [ ] 5.4 Implement retry mechanisms for failed requests
  - [ ] 5.5 Add network error handling and offline detection
  - [ ] 5.6 Create error components with retry buttons

- [ ] 6.0 TypeScript Types and Type Safety

  - [ ] 6.1 Create `hooks/types/api.ts` file for all API types
  - [ ] 6.2 Define types for all API responses (Project, User, Comment, etc.)
  - [ ] 6.3 Define types for all API requests (CreateProject, UpdateProject, etc.)
  - [ ] 6.4 Define types for query parameters and filters
  - [ ] 6.5 Add proper TypeScript generics for React Query hooks
  - [ ] 6.6 Ensure type safety in all custom hooks
  - [ ] 6.7 Add TypeScript documentation for complex types
  - [ ] 6.8 Test type safety with TypeScript compiler

- [ ] 7.0 Component Integration and Migration
  - [ ] 7.1 Update `components/ProjectList.tsx` to use `useProjects()` hook
  - [ ] 7.2 Update `components/ProjectCard.tsx` to use `useProject()` hook
  - [ ] 7.3 Update `app/profile/[id]/page.tsx` to use `useUser()` hook
  - [ ] 7.4 Update `app/project/[id]/page.tsx` to use `useProject()` and `useComments()` hooks
  - [ ] 7.5 Update `components/SubmitForm.tsx` to use mutation hooks
  - [ ] 7.6 Update `app/submit/page.tsx` to use mutation hooks
  - [ ] 7.7 Replace all manual fetch calls with React Query hooks
  - [ ] 7.8 Add skeleton loading states to all data-fetching components
  - [ ] 7.9 Add error handling to all components
  - [ ] 7.10 Remove old fetch logic and clean up unused code
