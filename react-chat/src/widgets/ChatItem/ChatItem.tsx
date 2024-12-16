import { Check, DoneAll } from '@mui/icons-material';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';
import { CurrentUserContext } from '@/shared/utils/context';
import { formateDate, getInitials } from '@/shared/utils/utils';

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

  const isMyLastSendMessageRead =
    last_message?.sender?.id === currentUser?.id &&
    last_message?.was_read_by?.some((user) => user.id !== currentUser?.id);

  const IconStatus = IconsStatus[isMyLastSendMessageRead ? 'read' : 'sent'];

  const subtitle = last_message?.voice
    ? 'Voice message'
    : last_message?.files?.length
      ? `Images (${last_message.files.length})`
      : last_message?.text;

  return (
    <Link className={styles.item} to={String(id)}>
      {avatar ? (
        <LazyImage src={avatar} alt="Аватар" imageStyle={styles.avatar} />
      ) : (
        <div className={styles.avatar}>{getInitials(title)}</div>
      )}
      <div className={styles.content}>
        <p className={styles.name}>{title}</p>
        <p className={styles['last-message']}>{subtitle}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.time}>
          {formateDate(new Date(created_at!), 'ru', timeFormatOptions)}
        </p>
        <div className={styles.status}>
          <IconStatus />
        </div>
      </div>
    </Link>
  );
};
