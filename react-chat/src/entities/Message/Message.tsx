import { Check, DoneAll } from '@mui/icons-material';
import { FC } from 'react';

import { formateDate } from '../../utils/utils';
import styles from './Message.module.scss';
import { IMessageProps } from './Message.props';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

const IconsStatus = {
  read: Check,
  sent: DoneAll,
};

export const Message: FC<IMessageProps> = ({
  message,
  timestamp,
  status,
  type,
}) => {
  const IconStatus = IconsStatus[status];

  return (
    <div className={styles.message} data-type={type}>
      <p className={styles['message-text']}>{message}</p>
      <div className={styles['message-info']}>
        <span className={styles['message-time']}>
          {formateDate(timestamp, 'ru', timeFormatOptions)}
        </span>
        <div className={styles['message-status']}>
          <IconStatus />
        </div>
      </div>
    </div>
  );
};
