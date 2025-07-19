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
  projects?: any[];
  followers?: number;
  following?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  votes: number;
  comments: number;
  createdAt: string;
  liveUrl?: string;
  githubUrl?: string;
}
