import { ArrowBack, MoreVert, Search } from '@mui/icons-material';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';
import { chatData } from '@/pages/ChatsPage/mock';
import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './ChatPageHeader.module.scss';
import { IChatPageHeaderProps } from './ChatPageHeader.props';

export const ChatPageHeader: FC<IChatPageHeaderProps> = () => {
  const { id } = useParams();
  const { avatar, name, status } = chatData[Number(id) - 1];
  return (
    <Header extraClassName={styles.header}>
      <Link className={styles.icon} to={`/${ROUTES.CHATS}`}>
        <ArrowBack />
        <Ripple color={'#af5dfc'} duration={2000} />
      </Link>
      <div className={styles['user-info']}>
        <img
          className={styles['user-info__avatar']}
          src={avatar}
          alt="аватар пользователя"
        />
        <div className={styles['user-info__info']}>
          <p className={styles['user-info__name']}>{name}</p>
          <p className={styles['user-info__status']}>{status}</p>
        </div>
      </div>
      <div className={styles.icon}>
        <Search />
        <Ripple color={'#af5dfc'} duration={2000} />
      </div>
      <div className={styles.icon}>
        <MoreVert className={styles.icon} />
        <Ripple color={'#af5dfc'} duration={2000} />
      </div>
    </Header>
  );
};
