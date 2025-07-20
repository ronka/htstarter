# Tasks: Daily Voting System Implementation

## Relevant Files

- `db/schema.ts` - Database schema file with comments column removed from projects table
- `app/api/projects/[id]/vote/route.ts` - API endpoint for vote operations with daily vote tracking
- `app/api/projects/[id]/votes/route.ts` - API endpoint for fetching vote statistics
- `components/ProjectCard.tsx` - Project card component with vote display and toggle functionality
- `components/project/ProjectStats.tsx` - Project stats component with vote statistics and toggle functionality
- `components/project/ProjectSidebar.tsx` - Project sidebar component updated to pass vote props
- `components/project/ProjectMain.tsx` - Project main component updated to use dynamic vote counts
- `components/project/ProjectImage.tsx` - Project image component updated to use VoteButton
- `components/ui/heart-icon.tsx` - Reusable heart icon component with filled/outlined states
- `components/ui/vote-button.tsx` - Reusable vote button component with accessibility features
- `components/ui/vote-status-message.tsx` - Vote status message component for user feedback
- `components/ui/vote-count-display.tsx` - Vote count display component for statistics
- `hooks/use-vote.ts` - Custom hook for vote operations and state management with optimistic updates
- `hooks/use-vote-stats.ts` - Custom hook for fetching vote statistics
- `lib/db.ts` - Database connection and query utilities
- `app/page.tsx` - Home page with vote display updates
- `app/project/[id]/page.tsx` - Project detail page with vote stats integration
- `types/database.ts` - TypeScript types for database entities

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `use-vote.ts` and `use-vote.test.ts` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Database Schema Updates

  - [x] 1.1 Remove `comments` integer column from projects table in schema.ts
  - [x] 1.2 Create and run database migration to remove comments column
  - [x] 1.3 Update TypeScript types to reflect schema changes
  - [x] 1.4 Verify votes table structure is correct (user_id, project_id, created_at)
  - [x] 1.5 Add database indexes for vote queries (user_id, project_id, created_at)

- [x] 2.0 Voting API Implementation

  - [x] 2.1 Create `app/api/projects/[id]/vote/route.ts` file
  - [x] 2.2 Implement POST method with Clerk authentication validation
  - [x] 2.3 Add logic to check if user has already voted today on the project
  - [x] 2.4 Implement vote creation when no existing vote found
  - [x] 2.5 Implement vote deletion (toggle) when existing vote found
  - [x] 2.6 Add daily vote count calculation (votes created today)
  - [x] 2.7 Add total vote count calculation (all votes for project)
  - [x] 2.8 Return updated vote counts in API response
  - [x] 2.9 Add proper error handling for invalid project IDs and authentication failures
  - [x] 2.10 Add input validation for project ID parameter

- [x] 3.0 Vote Hook and State Management

  - [x] 3.1 Create `hooks/use-vote.ts` custom hook
  - [x] 3.2 Implement `useVote` hook with project ID parameter
  - [x] 3.3 Add vote state management (hasVoted, dailyVotes, totalVotes)
  - [x] 3.4 Implement `toggleVote` function for vote/unvote operations
  - [x] 3.5 Add loading states for vote operations
  - [x] 3.6 Add error handling and user feedback
  - [x] 3.7 Implement optimistic updates for better UX
  - [x] 3.8 Add vote status checking (whether user has voted today)

- [x] 4.0 Home Page Vote Display Updates

  - [x] 4.1 Update `components/ProjectCard.tsx` to replace comments with vote display
  - [x] 4.2 Add heart icon component (filled/outlined states)
  - [x] 4.3 Display today's vote count with "X votes today" format
  - [x] 4.4 Show filled heart if user has voted, outlined if not
  - [x] 4.5 Add click handler for vote toggle functionality
  - [x] 4.6 Integrate `useVote` hook in ProjectCard component
  - [x] 4.7 Update `app/page.tsx` to pass necessary props to ProjectCard
  - [x] 4.8 Add loading states and error handling for vote interactions

- [x] 5.0 Project Page Vote Stats Implementation

  - [x] 5.1 Update `components/project/ProjectStats.tsx` to show vote statistics
  - [x] 5.2 Display both daily and total vote counts in "X votes today • Y total votes" format
  - [x] 5.3 Add user voting status indicator with heart icon
  - [x] 5.4 Show "You voted today" or "Vote again tomorrow" status message
  - [x] 5.5 Add vote toggle functionality to project stats section
  - [x] 5.6 Integrate `useVote` hook in ProjectStats component
  - [x] 5.7 Update `app/project/[id]/page.tsx` to handle vote state
  - [x] 5.8 Add visual feedback for vote actions (success/error states)

- [x] 6.0 UI Components and Vote Interface
  - [x] 6.1 Create reusable HeartIcon component with filled/outlined states
  - [x] 6.2 Add proper accessibility attributes (aria-label, tabindex, keyboard navigation)
  - [x] 6.3 Implement consistent styling with existing theme (red for hearts)
  - [x] 6.4 Add hover and focus states for vote buttons
  - [x] 6.5 Create vote status message component for user feedback
  - [x] 6.6 Add loading spinner for vote operations
  - [x] 6.7 Implement smooth transitions for vote state changes
  - [x] 6.8 Add responsive design considerations for vote interface
