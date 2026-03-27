export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'SUPER_ADMIN';
  isVerified: boolean;
  status: 'ACTIVE' | 'BLOCKED';
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  picture?: string;
}

export interface ILogin {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
  meta?: IMeta;
}

export interface IGlobalError {
  error: Error & { digest?: string };
  reset: () => void;
}
