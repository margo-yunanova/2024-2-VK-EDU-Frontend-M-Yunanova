import { IMessage, vacationChat } from '@/pages/ChatPage/mock';

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
