import { Check, DoneAll } from '@mui/icons-material';
import { FC, forwardRef } from 'react';

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

export const Message: FC<IMessageProps> = forwardRef(
  ({ message, timestamp, status, type }, ref) => {
    const IconStatus = IconsStatus[status];

    return (
      <div className={styles.message} data-type={type} ref={ref}>
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
  },
);
