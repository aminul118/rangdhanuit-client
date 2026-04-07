export interface BlogPayload {
  title?: string;
  content?: string;
  category?: string;
  featuredImage?: string;
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED";
}

export interface IBlogAuthor {
  _id?: string;
  name: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: IBlogAuthor;
  category: string;
  tags: string[];
  featuredImage: string;
  views: number;
  status: "DRAFT" | "PUBLISHED";
  isDeleted: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IBlogDetail = IBlog;

export type IBlogSummary = Omit<
  IBlog,
  "content" | "tags" | "views" | "status" | "isDeleted" | "updatedAt"
>;
