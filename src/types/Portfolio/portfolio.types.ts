export interface IPortfolio {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  link?: string;
  technologies: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePortfolio {
  title: string;
  description: string;
  image: string;
  link?: string;
  technologies: string[];
  isFeatured?: boolean;
}
