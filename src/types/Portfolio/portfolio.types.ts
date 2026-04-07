export interface IPortfolio {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  liveLink?: string;
  github?: string;
  technologies: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePortfolio {
  title: string;
  content: string;
  thumbnail: string;
  liveLink?: string;
  github?: string;
  technologies: string[];
  isFeatured?: boolean;
}
