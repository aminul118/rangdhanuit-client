import { IUser } from "../User/user.types";

export type NotificationType = "MESSAGE" | "SYSTEM" | "ALERT";

export interface INotification {
  _id: string;
  recipient: string | IUser;
  sender: string | IUser;
  type: NotificationType;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
