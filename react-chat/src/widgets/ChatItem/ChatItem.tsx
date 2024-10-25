import { Check, DoneAll } from '@mui/icons-material';
import { FC, useContext } from 'react';

import { CounterUnread } from '@/feature/CounterUnread/CounterUnread';
import { TabsContext } from '@/shared/utils/context';
import { formateDate } from '@/shared/utils/utils';

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
  avatar,
  name,
  status,
  lastMessage,
  timestamp,
  unreadCount,
}) => {
  const { handlePage } = useContext(TabsContext)!;
  const IconStatus = IconsStatus[status];
  const Status =
    unreadCount > 0 ? (
      <CounterUnread counter={unreadCount} />
    ) : (
      <div className={styles.status}>
        <IconStatus />
      </div>
    );

  return (
    <button className={styles.item} onClick={handlePage}>
      <img src={avatar} className={styles.avatar} alt="Аватар" />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles['last-message']}>{lastMessage}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.time}>
          {formateDate(timestamp, 'ru', timeFormatOptions)}
        </p>
        {Status}
      </div>
    </button>
  );
};
