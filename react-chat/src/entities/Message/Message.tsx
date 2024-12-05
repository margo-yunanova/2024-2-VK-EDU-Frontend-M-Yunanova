import { Check, DoneAll } from '@mui/icons-material';
import { forwardRef } from 'react';

import { MessageStatus } from '@/pages/ChatPage/mock';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { LazyImage } from '@/shared/ui/LazyImage/LazyImage';
import { useChatRetrieveQuery } from '@/store/api';

import { formateDate, getInitials } from '../../shared/utils/utils';
import styles from './Message.module.scss';
import { IMessageProps } from './Message.props';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

const IconsStatus = {
  read: DoneAll,
  sent: Check,
};

export const Message = forwardRef<HTMLDivElement, IMessageProps>(
  ({ text, created_at, sender, was_read_by, files, voice, chatId }, ref) => {
    const { data: chat } = useChatRetrieveQuery({ id: chatId! });
    const currentUser = useCurrentUser();

    const type = sender.id === currentUser?.id ? 'input' : 'output';

    let status: MessageStatus = MessageStatus.sent;

    if (type === 'input') {
      const users = was_read_by.filter((user) => user.id !== currentUser?.id);
      status = users.length > 0 ? MessageStatus.read : MessageStatus.sent;
    }
    const IconStatus = IconsStatus[status];

    return (
      <li className={styles.wrap} data-type={type}>
        {!chat?.is_private &&
          (sender?.avatar ? (
            <LazyImage
              src={sender?.avatar}
              alt="Аватар"
              imageStyle={styles.avatar}
            />
          ) : (
            <div className={styles.avatar}>
              {getInitials(sender.first_name + ' ' + sender.last_name)}
            </div>
          ))}
        <div className={styles.message} ref={ref}>
          <p className={styles['message-text']}>{text}</p>
          {files.length > 0 && (
            <div className={styles['message-files']}>
              {files.map((file, i) => (
                <LazyImage
                  key={i}
                  src={file.item!}
                  alt="Изображение"
                  imageStyle={styles.image}
                />
              ))}
            </div>
          )}
          {voice && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <audio controls className={styles.voice}>
              <source src={voice} type="audio/webm" />
            </audio>
          )}
          <div className={styles['message-info']}>
            <span className={styles['message-time']}>
              {formateDate(new Date(created_at), 'ru', timeFormatOptions)}
            </span>
            {type === 'input' && (
              <div className={styles['message-status']}>
                <IconStatus />
              </div>
            )}
          </div>
        </div>
      </li>
    );
  },
);
