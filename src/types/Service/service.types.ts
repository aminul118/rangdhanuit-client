export interface IService {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon: string;
  isDeleted: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  createdAt: string;
  updatedAt: string;
}
