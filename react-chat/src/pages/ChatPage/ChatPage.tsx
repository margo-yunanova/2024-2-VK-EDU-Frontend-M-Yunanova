import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';

import { Message } from '@/entities/Message/Message';
import { Form } from '@/feature/Form/Form';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { useChatRetrieveQuery, useMessagesListQuery } from '@/store/api';
import { ChatPageHeader } from '@/widgets/ChatPageHeader/ChatPageHeader';

import styles from './ChatPage.module.scss';

export const ChatPage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const { data } = useMessagesListQuery(
    {
      chat: id!,
      page: 1,
      pageSize: 100,
    },
    { pollingInterval: 1000, skipPollingIfUnfocused: true },
  );
  const { data: chat } = useChatRetrieveQuery({ id: id! });

  const scrollToMessage = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(() => [...(data?.results ?? [])].reverse(), [data]);

  const setScrollToMessageRef = (index: number, length: number) => {
    const lastReadMessageIndex =
      messages.findLastIndex((message) =>
        message?.was_read_by?.some((user) => user.id === currentUser?.id),
      ) ?? -1;

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

  return (
    <>
      {chat && <ChatPageHeader {...chat} />}
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
        <Form />
      </main>
    </>
  );
};
