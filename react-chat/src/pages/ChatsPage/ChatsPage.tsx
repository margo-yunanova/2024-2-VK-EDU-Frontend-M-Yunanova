import { useState } from 'react';

import { BurgerMenu } from '@/feature/BurgerMenu/BurgerMenu';
import { ChatItem } from '@/widgets/ChatItem/ChatItem';
import { ChatsPageHeader } from '@/widgets/ChatsPageHeader/ChatsPageHeader';

import styles from './ChatsPage.module.scss';
import { chatData } from './mock';

export const ChatsPage = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);
  return (
    <>
      <ChatsPageHeader openMenu={() => setBurgerActive(true)} />
      <main className={styles.chats}>
        <section className={styles.list}>
          {chatData.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </section>
      </main>
      <BurgerMenu
        isOpen={isBurgerActive}
        close={() => setBurgerActive(false)}
      />
    </>
  );
};
