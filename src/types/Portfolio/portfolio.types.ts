export interface IPortfolio {
  _id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  liveLink?: string;
  github?: string;
  youtubeUrl?: string;
  videoUrl?: string;
  technologies: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface ICreatePortfolio {
  title: string;
  content: string;
  thumbnail: string;
  liveLink?: string;
  github?: string;
  youtubeUrl?: string;
  videoUrl?: string;
  technologies: string[];
  isFeatured?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}
