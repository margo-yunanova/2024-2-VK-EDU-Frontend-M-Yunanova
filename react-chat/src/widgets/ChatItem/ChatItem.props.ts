import { MessageStatus } from '@/pages/ChatPage/mock';

export interface ChatItemProps {
  id: number;
  avatar: string;
  name: string;
  status: MessageStatus;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
}
