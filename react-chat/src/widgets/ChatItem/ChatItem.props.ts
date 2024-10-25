import { MessageStatus } from '@/pages/ChatPage/mock';

export interface ChatItemProps {
  avatar: string;
  name: string;
  status: MessageStatus;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}
