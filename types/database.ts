// Re-export types from schema for convenience
export type {
  User,
  NewUser,
  Project,
  NewProject,
  Vote,
  NewVote,
  DailyWinner,
  NewDailyWinner,
} from "../db/schema";

// Import types for use in interfaces
import type { User, Project, DailyWinner } from "../db/schema";

// Extended types for API responses
export interface ProjectWithAuthor extends Project {
  author: User;
  _count?: {
    votes: number;
  };
}

export interface UserWithStats extends User {
  _count?: {
    projects: number;
    followers: number;
    following: number;
  };
}

export interface DailyWinnerWithProject extends DailyWinner {
  project: Project & {
    author: User;
  };
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
