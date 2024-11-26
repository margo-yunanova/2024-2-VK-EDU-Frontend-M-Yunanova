import { ChatItem } from '@/widgets/ChatItem/ChatItem';
import { ChatsPageHeader } from '@/widgets/ChatsPageHeader/ChatsPageHeader';

import styles from './ChatsPage.module.scss';
import { chatData } from './mock';

export const ChatsPage = () => {
  return (
    <>
      <ChatsPageHeader />
      <main className={styles.chats}>
        <section className={styles.list}>
          {chatData.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </section>
      </main>
    </>
  );
};
