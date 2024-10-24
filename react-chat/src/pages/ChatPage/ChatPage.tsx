import { useEffect, useRef, useState } from 'react';

import { Message } from '@/entities/Message/Message';
import { Form } from '@/feature/Form/Form';
import { IMessage, MessageStatus } from '@/pages/ChatPage/mock';
import { init } from '@/utils/utils';
import { ChatPageHeader } from '@/widgets/ChatPageHeader/ChatPageHeader';

import styles from './ChatPage.module.scss';

export const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>(() => init());
  const scrollToMessage = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const setScrollToMessageRef = (index: number, length: number) => {
    const lastReadMessageIndex = messages.findIndex(
      (item) => item.status === MessageStatus.sent && item.type === 'output',
    );

    if (
      (lastReadMessageIndex === -1 && index === length - 1) ||
      index === lastReadMessageIndex
    ) {
      return scrollToMessage;
    }

    return undefined;
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToMessage.current?.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }, 0);
  }, [messages]);

  const addMessage = (message: IMessage) => {
    setMessages((messages) => {
      const chatMessages = [
        ...messages.map((item) => ({ ...item, status: MessageStatus.read })),
        message,
      ];
      localStorage.setItem('chat', JSON.stringify(chatMessages));
      return chatMessages;
    });
  };

  return (
    <>
      <ChatPageHeader />
      <main className={styles.chat}>
        <section className={styles.messages} ref={messagesRef}>
          {messages.map((message, i, { length }) => (
            <Message
              key={message.id}
              {...message}
              ref={setScrollToMessageRef(i, length)}
            />
          ))}
        </section>
        <Form onSubmit={addMessage} />
      </main>
    </>
  );
};
