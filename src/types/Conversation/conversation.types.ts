import { IUser } from '../User/user.types';

export interface IMessage {
  _id: string;
  conversationId: string;
  sender: string | IUser;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IConversation {
  _id: string;
  participants: (string | IUser)[];
  lastMessage?: string | IMessage;
  unreadCount: Record<string, number>;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageConversation extends Omit<IConversation, 'participants' | 'lastMessage'> {
  participants: IUser[];
  lastMessage?: IMessage;
}
