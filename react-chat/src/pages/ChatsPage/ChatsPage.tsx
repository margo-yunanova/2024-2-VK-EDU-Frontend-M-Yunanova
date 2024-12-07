import { useState } from 'react';

import { Menu } from '@/feature/Menu/Menu';
import { useChatsListQuery } from '@/store/api';
import { ChatItem } from '@/widgets/ChatItem/ChatItem';
import { ChatsPageHeader } from '@/widgets/ChatsPageHeader/ChatsPageHeader';

import styles from './ChatsPage.module.scss';

export const ChatsPage = () => {
  const [isBurgerActive, setBurgerActive] = useState(false);

  const { data } = useChatsListQuery({ page: 1, pageSize: 100 });

  return (
    <>
      <ChatsPageHeader
        isBurgerActive={isBurgerActive}
        onClick={() => setBurgerActive(!isBurgerActive)}
      />
      <main className={styles.chats}>
        <section className={styles.list}>
          {data?.results.map((chat) => <ChatItem key={chat.id} {...chat} />)}
        </section>
      </main>
      <Menu isOpen={isBurgerActive} close={() => setBurgerActive(false)} />
    </>
  );
};
