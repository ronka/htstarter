# Search API Documentation

## Endpoint: `GET /api/search`

The search API allows you to search for projects by name, description, and filter by technology options.

### Query Parameters

| Parameter   | Type   | Description                                  | Default     |
| ----------- | ------ | -------------------------------------------- | ----------- |
| `q`         | string | Search query for project name or description | -           |
| `filters`   | string | Comma-separated list of technology filters   | -           |
| `page`      | number | Page number for pagination                   | 1           |
| `limit`     | number | Number of results per page                   | 10          |
| `sortBy`    | string | Sort field: `createdAt`, `votes`, `title`    | `createdAt` |
| `sortOrder` | string | Sort order: `asc`, `desc`                    | `desc`      |

### Example Requests

#### Search by project name:

```
GET /api/search?q=React
```

#### Filter by technology:

```
GET /api/search?filters=React,TypeScript
```

#### Combined search with filters:

```
GET /api/search?q=Todo&filters=React,TypeScript&page=1&limit=20
```

#### Sort by votes:

```
GET /api/search?sortBy=votes&sortOrder=desc
```

### Response Format

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Project Title",
      "description": "Project description",
      "image": "https://example.com/image.jpg",
      "technologies": ["React", "TypeScript"],
      "liveUrl": "https://example.com",
      "githubUrl": "https://github.com/example",
      "votes": 42,
      "features": ["Feature 1", "Feature 2"],
      "longDescription": "Detailed project description",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "author": {
        "id": "user-id",
        "name": "Author Name",
        "avatar": "https://example.com/avatar.jpg"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "search": {
    "query": "React",
    "filters": ["React", "TypeScript"]
  }
}
```

### Error Responses

#### Invalid Parameters (400):

```json
{
  "success": false,
  "error": "Invalid search parameters",
  "details": [...]
}
```

#### Server Error (500):

```json
{
  "success": false,
  "error": "Failed to search projects"
}
```

### Features

- **Full-text search**: Searches project title, description, and long description
- **Technology filtering**: Filter projects by specific technologies using JSONB containment
- **Pagination**: Supports pagination with configurable page size
- **Sorting**: Sort by creation date, vote count, or title
- **Author information**: Includes author details in search results
- **Parameter validation**: Validates all input parameters using Zod
- **Debounced search**: 300ms debounce to prevent excessive API calls during typing

### Usage in Frontend

The search functionality is integrated with the search page at `/search` and uses the `useSearchProjects` hook:

```typescript
import { useSearchProjects } from "@/hooks/use-search-projects";

const { data, isLoading, error } = useSearchProjects({
  q: "React",
  filters: ["TypeScript"],
  page: 1,
  limit: 12,
});
```

**Note**: The search automatically debounces both the search query and filters with a 300ms delay to prevent excessive API calls while the user is typing.
