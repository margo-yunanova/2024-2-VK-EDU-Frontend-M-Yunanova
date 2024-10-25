import { createContext } from 'react';

import { IMessage, vacationChat } from '@/pages/ChatPage/mock';

type TLocale = 'ru' | 'US-en';

// export enum MessageStatus {
//   sent = 'sent',
//   read = 'read',
// }

export const formateDate = (
  timestamp: Date,
  locale: TLocale,
  options?: Intl.DateTimeFormatOptions,
) => new Intl.DateTimeFormat(locale, options).format(new Date(timestamp));

export const init = (): IMessage[] => {
  const storageMessages = localStorage.getItem('chat');

  const chatMessages = storageMessages
    ? JSON.parse(storageMessages)
    : vacationChat;

  if (!storageMessages) {
    localStorage.setItem('chat', JSON.stringify(vacationChat));
  }

  return chatMessages;
};

interface ITabsContext {
  activePage: 'chatPage' | 'chatsPage';
  handlePage: () => void;
}
export const TabsContext = createContext<ITabsContext | null>(null);
