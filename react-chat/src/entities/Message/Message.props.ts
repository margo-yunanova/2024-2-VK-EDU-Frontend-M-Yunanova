import { RefObject } from 'react';

import { MessageStatus } from '@/pages/ChatPage/mock';

export type MessageType = 'input' | 'output';

export interface IMessageProps {
  message: string;
  timestamp: Date;
  status: MessageStatus;
  type: MessageType;
  ref: RefObject<HTMLDivElement> | undefined;
}
