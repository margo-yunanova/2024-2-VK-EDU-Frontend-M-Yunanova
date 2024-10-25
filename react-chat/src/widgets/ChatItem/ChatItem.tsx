import { FC } from 'react';

import { formateDate } from '@/utils/utils';

import styles from './ChatItem.module.scss';
import { ChatItemProps } from './ChatItem.props';

export const ChatItem: FC<ChatItemProps> = ({
  avatar,
  name,
  status,
  lastMessage,
  timestamp,
  statusIcon,
}) => {
  return (
    <button className={styles.item}>
      <img src={avatar} className={styles.avatar} alt="Аватар" />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles['last-message']}>{lastMessage}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.time}>{formateDate(timestamp, 'ru')}</p>
        <p className={styles.status}>{status}</p>
        <img src={statusIcon} className={styles['status-icon']} alt="Статус" />
      </div>
    </button>
  );
};
