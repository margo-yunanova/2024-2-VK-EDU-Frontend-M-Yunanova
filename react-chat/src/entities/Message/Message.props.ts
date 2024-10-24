import { Ref } from 'react';

import { MessageStatus } from '@/pages/ChatPage/mock';

export type MessageType = 'input' | 'output';

export interface IMessageProps {
  id: number | string;
  message: string;
  timestamp: Date;
  status: MessageStatus;
  type: MessageType;
  ref?: Ref<HTMLDivElement>;
  sender: string;
}
