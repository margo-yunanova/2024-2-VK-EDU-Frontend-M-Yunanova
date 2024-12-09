import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { ROUTES } from '@/shared/routes/ROUTES';
import { ContactCard } from '@/shared/ui/ContactCard/ContactCard';
import { Loader } from '@/shared/ui/Loader/Loader';
import { useChatsCreateMutation, useUsersListQuery } from '@/store/api';

import { CreatingChatHeader } from '../../shared/ui/CreatingChatHeader/CreatingChatHeader';
import styles from './CreatingPrivateChatPage.module.scss';

export const CreatingPrivateChatPage = () => {
  useWindowTitle('Creating private chat');

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const { data, isLoading } = useUsersListQuery({
    page: 1,
    pageSize: 100,
    search: debouncedSearchValue,
  });

  const [createChat, { data: newChat }] = useChatsCreateMutation();
  const navigate = useNavigate();

  const handleCreateChat = (userId: string) => {
    createChat({
      fallback: 'on',
      body: {
        is_private: true,
        avatar: null,
        members: [userId],
      },
    });
  };

  useEffect(() => {
    if (newChat) {
      setSearchValue('');
      navigate(`/${ROUTES.CHAT(newChat.id)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChat]);

  return (
    <>
      {isLoading && <Loader />}
      <CreatingChatHeader value={searchValue} setValue={setSearchValue} />
      <ul className={styles.contacts}>
        {data?.results.map(
          ({
            first_name,
            last_name,
            id,
            avatar,
            is_online,
            last_online_at,
          }) => (
            <li key={id}>
              <ContactCard
                id={id}
                avatar={avatar}
                firstName={first_name}
                lastName={last_name}
                isOnline={is_online}
                lastOnlineAt={last_online_at}
                onClick={() => handleCreateChat(id)}
              />
            </li>
          ),
        )}
      </ul>
    </>
  );
};
