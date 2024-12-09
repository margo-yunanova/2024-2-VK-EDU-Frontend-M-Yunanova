import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { ROUTES } from '@/shared/routes/ROUTES';
import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';
import { Loader } from '@/shared/ui/Loader/Loader';
import { formateDate, getInitials } from '@/shared/utils/utils';
import { useChatsCreateMutation, useUsersListQuery } from '@/store/api';

import styles from './CreatingPrivateChatPage.module.scss';
import { PageHeader } from './ui/PageHeader';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

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

  const getUserStatus = (is_online: boolean, last_online_at: string) =>
    is_online
      ? 'Online'
      : 'Last online ' +
        formateDate(new Date(last_online_at), 'ru', timeFormatOptions);

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
      <PageHeader value={searchValue} setValue={setSearchValue} />
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
              <button
                className={styles.contact}
                onClick={() => handleCreateChat(id)}
              >
                {avatar ? (
                  <LazyImage
                    src={avatar}
                    alt="Аватар"
                    imageStyle={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatar}>
                    {getInitials(first_name + ' ' + last_name)}
                  </div>
                )}
                <div className={styles['contact-info__info']}>
                  <p className={styles['contact-info__name']}>
                    {first_name + ' ' + last_name}
                  </p>
                  <p className={styles['contact-info__status']}>
                    {getUserStatus(is_online, last_online_at)}
                  </p>
                </div>
              </button>
            </li>
          ),
        )}
      </ul>
    </>
  );
};
