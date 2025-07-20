# Product Requirements Document: Daily Winners Feature

## Introduction/Overview

The Daily Winners feature will showcase the best project of each day based on vote count. This feature provides recognition to outstanding projects and creates a historical record of daily achievements. Users will be able to view all past daily winners in a chronological list, with each winner displaying project details, vote count, and the date they won.

## Goals

1. **Recognition**: Provide daily recognition to the most voted project of each day
2. **Historical Record**: Maintain a searchable archive of all daily winners
3. **User Engagement**: Encourage users to view and discover past winning projects
4. **Transparency**: Show clear criteria for what constitutes a daily winner

## User Stories

1. **As a user**, I want to see the daily winner so that I can discover the best project of each day
2. **As a user**, I want to browse past daily winners so that I can explore historical winning projects
3. **As a user**, I want to click on a daily winner to view the full project details so that I can learn more about the winning project
4. **As a project creator**, I want to see if my project won on a particular day so that I can get recognition for my work

## Functional Requirements

1. **Database Schema**: The system must include a new `daily_winners` table with the following fields:

   - `id` (primary key)
   - `project_id` (foreign key to projects table)
   - `win_date` (date the project won)
   - `vote_count` (number of votes the project had when it won)
   - `created_at` (timestamp when the record was created)

2. **Winner Selection Logic**: The system must identify the project with the highest vote count at the end of each day (11:59 PM)

3. **Tie Handling**: If multiple projects have the same highest vote count on a given day, the system must store all tied projects as winners for that day

4. **Daily Winners Page**: The system must provide a dedicated page at `/daily-winners` that displays all daily winners

5. **Winner Display**: Each daily winner must display:

   - Project title
   - Project description (truncated if too long)
   - Project image (if available)
   - Vote count at time of winning
   - Win date
   - Link to the full project page

6. **List View**: The daily winners must be displayed in a card-based list view, ordered by date (most recent first)

7. **Navigation**: The daily winners page must be accessible from the main navigation

8. **Empty State**: If no daily winners exist, the page must display an appropriate empty state message

9. **Responsive Design**: The daily winners page must be fully responsive and work on mobile devices

## Non-Goals (Out of Scope)

1. **Cron Job Implementation**: The automated process that populates the daily winners table is out of scope for this PRD
2. **Real-time Updates**: The page does not need to update in real-time when new winners are added
3. **Winner Notifications**: Sending notifications to winners is not included
4. **Winner Analytics**: Detailed analytics about winning patterns are not required
5. **Winner Categories**: Only overall daily winners are supported, not category-specific winners
6. **Timezone Handling**: The system will use a single timezone for daily calculations

## Design Considerations

1. **Card Layout**: Use a card-based design similar to the existing project cards
2. **Visual Hierarchy**: Clearly distinguish the win date and vote count
3. **Consistent Styling**: Follow the existing design system and use TailwindCSS classes
4. **Loading States**: Include skeleton loading states while data is being fetched
5. **Error Handling**: Display appropriate error messages if data cannot be loaded

## Technical Considerations

1. **Database Integration**: The new `daily_winners` table should integrate with the existing Drizzle ORM setup
2. **React Query**: Use React Query for data fetching and caching of daily winners
3. **API Route**: Create a new API route at `/api/daily-winners` to fetch the winners data
4. **TypeScript Types**: Define proper TypeScript types for the daily winner data
5. **Pagination**: Consider pagination if the list becomes very long over time

## Success Metrics

1. **User Engagement**: Track page views and time spent on the daily winners page
2. **Navigation**: Monitor how many users access the daily winners page from the main navigation
3. **Project Clicks**: Measure how often users click through to view full project details
4. **Data Completeness**: Ensure all days with projects have corresponding winner records

## Open Questions

1. **Winner Selection Time**: Should the winner be determined at a specific time each day (e.g., 11:59 PM) or based on a 24-hour rolling window?
2. **Minimum Vote Threshold**: Should there be a minimum vote count required to be considered a daily winner?
3. **Winner Display Limit**: How many past winners should be displayed on the page (all vs. paginated)?
4. **Winner Badge**: Should winning projects display a special badge or indicator on their main project page?
5. **Admin Interface**: Will there be a need for an admin interface to manually manage daily winners?

## Implementation Notes

- The cron job that populates the daily winners table will be implemented separately
- The feature should be designed to handle cases where the cron job hasn't run yet
- Consider adding indexes on the `win_date` field for efficient querying
- The API should support filtering by date range if needed in the future
