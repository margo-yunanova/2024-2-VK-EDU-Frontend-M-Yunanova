import { Check, DoneAll } from '@mui/icons-material';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '@/shared/hooks/stateHooks';
import { CurrentUserContext } from '@/shared/utils/context';
import { formateDate, getInitials } from '@/shared/utils/utils';
import { setActiveChat } from '@/store/slices/chatSlice';

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
  is_private,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const dispatch = useAppDispatch();

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
    <Link
      className={styles.item}
      to={String(id)}
      onClick={() =>
        dispatch(
          setActiveChat({
            id,
            avatar,
            title,
            created_at,
            last_message,
            is_private,
          }),
        )
      }
    >
      {avatar ? (
        <img src={avatar} className={styles.avatar} alt="Аватар" />
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
