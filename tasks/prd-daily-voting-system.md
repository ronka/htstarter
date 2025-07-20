# Product Requirements Document: Daily Voting System

## Introduction/Overview

This feature will replace the current comments counter system with a daily voting mechanism. Users can vote once per project per day using a heart icon, with votes resetting at midnight. The system will display today's votes on the home page and both daily and total votes on individual project pages.

## Goals

1. **Replace Comments Counter**: Deprecate the existing comments counter integer field and replace it with a daily voting system
2. **Daily Engagement**: Encourage daily user engagement through the voting mechanism
3. **Clear Vote Display**: Show today's votes on home page and comprehensive vote stats on project pages
4. **User-Friendly Interface**: Provide intuitive heart-based voting with clear status feedback
5. **Data Integrity**: Ensure one vote per user per project per day with proper validation

## User Stories

1. **As a user**, I want to vote on projects I like so that I can show my daily support
2. **As a user**, I want to see today's votes on the home page so that I can discover trending projects
3. **As a user**, I want to see both daily and total votes on project pages so that I can understand project popularity
4. **As a user**, I want to know my voting status so that I understand when I can vote again
5. **As a user**, I want to toggle my vote if I change my mind so that I can correct my choice
6. **As a user**, I want to vote on multiple projects per day so that I can support various projects

## Functional Requirements

### 1. Database Schema Changes

- Remove `comments` integer column from projects table
- The `votes` table already exists with the correct structure:
  - `id` (primary key)
  - `user_id` (Clerk user ID)
  - `project_id` (foreign key to projects)
  - `created_at` (timestamp)
- No additional schema changes needed for the votes table

### 2. Voting API Endpoint

- Create `POST /api/projects/[id]/vote` endpoint
- Validate user authentication using Clerk
- Check if user has already voted today on this project
- If no vote exists: create new vote record
- If vote exists: delete the vote (toggle functionality)
- Return updated vote counts (daily and total)

### 3. Home Page Display

- Replace comments counter with today's vote count
- Show heart icon with vote count
- Display vote count as "X votes today"
- Heart should be filled if user has voted, outlined if not

### 4. Project Page Stats Section

- Display both daily and total vote counts
- Format: "X votes today • Y total votes"
- Show user's voting status with heart icon state
- Display "You voted today" or "Vote again tomorrow" message

### 5. Vote Status Feedback

- Show filled heart icon when user has voted today
- Show outlined heart icon when user hasn't voted today
- Display appropriate status message based on voting state
- Provide visual feedback on vote action (success/error)

### 6. Vote Reset Logic

- Implement daily vote reset at midnight (server time)
- Clear all daily vote counts at 00:00:00
- Maintain total vote counts for historical data

### 7. Data Validation

- Ensure one vote per user per project per day
- Validate user authentication on all vote operations
- Handle edge cases (deleted projects, invalid user IDs)

## Non-Goals (Out of Scope)

- Migration of existing comment data
- Comments functionality (completely replaced by votes)
- Real-time vote updates (page refresh required)
- Rate limiting or anti-spam measures
- Admin features for vote management
- Vote history display to users
- Weekly/monthly vote trends
- Vote analytics dashboard

## Design Considerations

### UI Components

- Use heart icon (filled/outlined) for voting interface
- Maintain consistent styling with existing project cards
- Use appropriate color scheme (red for hearts, consistent with current theme)
- Ensure accessibility with proper ARIA labels and keyboard navigation

### User Experience

- Clear visual distinction between voted and non-voted states
- Immediate feedback on vote actions
- Intuitive toggle behavior (click to vote, click again to unvote)
- Clear messaging about voting status and timing

### Integration Points

- Integrate with existing Clerk authentication system
- Use existing project card and project detail components
- Maintain consistency with current UI patterns and styling

## Technical Considerations

### Authentication

- Use Clerk user ID for vote tracking
- Validate authentication in vote API endpoint
- Handle unauthenticated user attempts gracefully

### Database Design

- Use efficient indexing on `votes` table (user_id, project_id, created_at)
- Implement proper foreign key constraints
- Consider query performance for vote counting

### API Design

- RESTful endpoint design for vote operations
- Proper error handling and status codes
- Return updated vote counts in response

### Performance

- Optimize vote counting queries for home page and project pages
- Consider caching strategies for vote counts if needed
- Ensure efficient database queries for daily vote calculations

## Success Metrics

1. **User Engagement**: Increase in daily active users voting on projects
2. **Vote Activity**: Number of daily votes cast across all projects
3. **User Retention**: Users returning daily to vote on projects
4. **System Performance**: API response times under 200ms for vote operations
5. **Data Integrity**: Zero duplicate votes per user per project per day

## Open Questions

1. Should we implement any notification system for users when they can vote again?
2. Do we need to handle timezone considerations for the midnight reset?
3. Should we add any visual indicators for projects with high vote counts?
4. Do we need to implement any cleanup processes for old vote data?

## Implementation Priority

1. **Phase 1**: Database schema changes and vote API endpoint
2. **Phase 2**: Update home page to display today's votes
3. **Phase 3**: Update project page stats section
4. **Phase 4**: Add vote status feedback and UI improvements
5. **Phase 5**: Testing and optimization

## Dependencies

- Existing Clerk authentication system
- Current project database schema
- Existing UI components and styling system
- Current API structure and patterns
