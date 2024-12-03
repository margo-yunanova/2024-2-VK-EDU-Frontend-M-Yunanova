import { Ref } from 'react';

import { MessageFile, UserRead } from '@/store/api';

export type MessageType = 'input' | 'output';

export interface IMessageProps {
  id: string;
  text?: string | null;
  voice: string | null;
  sender: UserRead;
  chat: string;
  files: MessageFile[];
  updated_at: string | null;
  created_at: string;
  was_read_by: UserRead[];
  ref?: Ref<HTMLDivElement>;
  chatId?: string;
}
