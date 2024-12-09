import { useState } from 'react';

import { Menu } from '@/feature/Menu/Menu';
import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { Loader } from '@/shared/ui/Loader/Loader';
import { useChatsListQuery } from '@/store/api';
import { ChatItem } from '@/widgets/ChatItem/ChatItem';
import { ChatsPageHeader } from '@/widgets/ChatsPageHeader/ChatsPageHeader';

import styles from './ChatsPage.module.scss';
import { ChatCreationModal } from './ui/ChatCreationModal/ChatCreationModal';
import { CreatingChatButton } from './ui/CreatingChatButton/CreatingChatButton';

export const ChatsPage = () => {
  useWindowTitle('Chats');
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [isModalActive, setModalActive] = useState(false);

  const { data, isLoading } = useChatsListQuery({ page: 1, pageSize: 100 });

  return (
    <>
      {isLoading && <Loader />}
      <ChatsPageHeader
        isBurgerActive={isBurgerActive}
        onClick={() => setBurgerActive(!isBurgerActive)}
      />
      <main className={styles.chats}>
        <section className={styles.list}>
          {data?.results.map((chat) => <ChatItem key={chat.id} {...chat} />)}
        </section>
        <div className={styles['creating-chat']}>
          {isModalActive && <ChatCreationModal />}
          <CreatingChatButton onClick={() => setModalActive(!isModalActive)} />
        </div>
      </main>
      <Menu isOpen={isBurgerActive} close={() => setBurgerActive(false)} />
    </>
  );
};
