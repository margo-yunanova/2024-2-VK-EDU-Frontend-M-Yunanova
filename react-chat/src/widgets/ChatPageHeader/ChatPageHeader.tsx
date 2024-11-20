import { ArrowBack, MoreVert, Search } from '@mui/icons-material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { ROUTES } from '@/shared/routes/ROUTES';
import { formateDate, getInitials } from '@/shared/utils/utils';

import styles from './ChatPageHeader.module.scss';
import { IChatPageHeaderProps } from './ChatPageHeader.props';

export const ChatPageHeader: FC<IChatPageHeaderProps> = ({
  is_private,
  members,
  avatar,
  title,
}) => {
  const currentUser = useCurrentUser();
  const user =
    is_private && members.find((member) => member.id !== currentUser?.id);

  return (
    <Header extraClassName={styles.header}>
      <Link className={styles.icon} to={`/${ROUTES.CHATS}`}>
        <ArrowBack />
        <Ripple color={'#af5dfc'} duration={2000} />
      </Link>
      <div className={styles['user-info']}>
        {avatar ? (
          <img src={avatar} className={styles.avatar} alt="Аватар" />
        ) : (
          <div className={styles.avatar}>{getInitials(title)}</div>
        )}
        <div className={styles['user-info__info']}>
          <p className={styles['user-info__name']}>{title}</p>
          {user && (
            <p className={styles['user-info__status']}>
              {user.is_online
                ? 'online'
                : formateDate(new Date(user.last_online_at), 'ru')}
            </p>
          )}
          {members.length > 2 && (
            <p className={styles['user-info__status']}>
              {members.length} members
            </p>
          )}
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
