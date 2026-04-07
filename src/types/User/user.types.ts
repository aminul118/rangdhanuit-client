export type UserRole = "ADMIN" | "USER" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  status: UserStatus;
  isDeleted: boolean;
  picture?: string;
  designation?: string;
  bio?: string;
  contactNo?: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  verifiedUsers: number;
  adminUsers: number;
}
