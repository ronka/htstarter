export interface UploadedImage {
  url: string;
  filename: string;
  size: number;
}

export interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  features: string[];
}
