export interface User {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  experience?: string;
  website?: string;
  github?: string;
  twitter?: string;
  skills?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  title: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrentlyWorking: boolean;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  technologies: string[];
  votes: number;
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
  longDescription?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}
