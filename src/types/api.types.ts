import { IUser } from "./User/user.types";

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

export interface IUpdateProfile {
  name?: string;
  contactNo?: string;
  designation?: string;
  bio?: string;
  picture?: string;
}
