# Task List: Daily Winners Feature

## Relevant Files

- `db/schema.ts` - Database schema definition for the daily_winners table
- `types/database.ts` - TypeScript types for daily winner data
- `app/api/daily-winners/route.ts` - API route handler for fetching daily winners
- `app/daily-winners/page.tsx` - Main daily winners page component
- `components/daily-winners/DailyWinnerCard.tsx` - Individual winner card component
- `components/daily-winners/DailyWinnersList.tsx` - List component for displaying winners
- `components/daily-winners/DailyWinnersSkeleton.tsx` - Loading skeleton component
- `hooks/use-daily-winners.ts` - Custom hook for fetching daily winners data
- `components/Header.tsx` - Update navigation to include daily winners link
- `components/HeaderWrapper.tsx` - Update header wrapper if needed for navigation

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `DailyWinnerCard.tsx` and `DailyWinnerCard.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Database Schema and Types Setup
  - [x] 1.1 Add daily_winners table to db/schema.ts with required fields (id, project_id, win_date, vote_count, created_at)
  - [x] 1.2 Create foreign key relationship to projects table
  - [x] 1.3 Add database index on win_date field for efficient querying
  - [x] 1.4 Update types/database.ts with DailyWinner interface
  - [x] 1.5 Create migration file for the new table
  - [x] 1.6 Run migration to create the table in the database
- [x] 2.0 API Route Implementation
  - [x] 2.1 Create app/api/daily-winners/route.ts file
  - [x] 2.2 Implement GET handler to fetch all daily winners
  - [x] 2.3 Add query to join with projects table to get project details
  - [x] 2.4 Implement sorting by win_date (most recent first)
  - [x] 2.5 Add error handling for database query failures
  - [x] 2.6 Add proper TypeScript types for API response
  - [x] 2.7 Test API endpoint with sample data
- [x] 3.0 Daily Winners Page Components
  - [x] 3.1 Create app/daily-winners/page.tsx main page component
  - [x] 3.2 Create components/daily-winners/DailyWinnerCard.tsx for individual winner display
  - [x] 3.3 Create components/daily-winners/DailyWinnersList.tsx for list container
  - [x] 3.4 Create components/daily-winners/DailyWinnersSkeleton.tsx for loading states
  - [x] 3.5 Implement responsive card layout with TailwindCSS
  - [x] 3.6 Add project image display with fallback to placeholder
  - [x] 3.7 Implement truncated description display
  - [x] 3.8 Add win date and vote count display with proper formatting
  - [x] 3.9 Create empty state component for when no winners exist
  - [x] 3.10 Add error state component for failed data loading
  - [x] 3.11 Implement click navigation to full project page
- [x] 4.0 Navigation Integration
  - [x] 4.1 Update components/Header.tsx to include daily winners navigation link
  - [x] 4.2 Add appropriate icon for daily winners in navigation
  - [x] 4.3 Ensure navigation link is properly styled and accessible
  - [x] 4.4 Test navigation functionality across different screen sizes
- [ ] 5.0 Data Fetching and State Management
  - [ ] 5.1 Create hooks/use-daily-winners.ts custom hook
  - [ ] 5.2 Implement React Query for data fetching and caching
  - [ ] 5.3 Add loading, error, and success states to the hook
  - [ ] 5.4 Integrate the hook with the daily winners page components
  - [ ] 5.5 Add proper error boundaries for failed data fetching
  - [ ] 5.6 Implement data refresh functionality if needed
  - [ ] 5.7 Test data fetching with various scenarios (loading, error, empty)
