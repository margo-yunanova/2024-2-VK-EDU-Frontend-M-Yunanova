import { Check, DoneAll } from '@mui/icons-material';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { CounterUnread } from '@/feature/CounterUnread/CounterUnread';
import { CurrentUserContext } from '@/shared/utils/context';
import { state } from '@/shared/utils/init';
import { formateDate, getInitials } from '@/shared/utils/utils';
import { useMessagesListQuery } from '@/store/api';

import styles from './ChatItem.module.scss';
import { ChatItemProps } from './ChatItem.props';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

const IconsStatus = {
  read: DoneAll,
  sent: Check,
};

export const ChatItem: FC<ChatItemProps> = ({
  id,
  avatar,
  title,
  created_at,
  last_message,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { data: messages } = useMessagesListQuery({
    chat: String(id),
    page: 1,
    pageSize: 100,
  });

  const counter =
    messages?.results.findLastIndex((message) =>
      message?.was_read_by?.some((user) => user.id === currentUser?.id),
    ) ?? -1;

  const IconStatus = IconsStatus['read'];

  const Status =
    !!messages?.results && counter !== messages?.results.length - 1 ? (
      <CounterUnread
        counter={counter < 0 ? messages?.results?.length : counter}
      />
    ) : (
      <div className={styles.status}>
        <IconStatus />
      </div>
    );

  return (
    <Link
      className={styles.item}
      to={String(id)}
      onClick={() => {
        state.activeChatId = id;
      }}
    >
      {avatar ? (
        <img src={avatar} className={styles.avatar} alt="Аватар" />
      ) : (
        <div className={styles.avatar}>{getInitials(title)}</div>
      )}
      <div className={styles.content}>
        <p className={styles.name}>{title}</p>
        <p className={styles['last-message']}>{last_message?.text}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.time}>
          {formateDate(new Date(created_at!), 'ru', timeFormatOptions)}
        </p>
        {Status}
      </div>
    </Link>
  );
};
