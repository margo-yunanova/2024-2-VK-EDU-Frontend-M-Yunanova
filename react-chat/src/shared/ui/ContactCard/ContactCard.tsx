import { FC } from 'react';

import { formateDate, getInitials } from '@/shared/utils/utils';

import { LazyImage } from '../LazyImage/LazyImage';
import styles from './ContactCard.module.scss';
import { IContactCard } from './ContactCard.props';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

export const ContactCard: FC<IContactCard> = ({
  avatar,
  firstName,
  lastName,
  isOnline,
  lastOnlineAt,
  onClick,
  checked,
}) => {
  const getUserStatus = (is_online: boolean, last_online_at: string) =>
    is_online
      ? 'Online'
      : 'Last online ' +
        formateDate(new Date(last_online_at), 'ru', timeFormatOptions);

  return (
    <button className={styles.contact} onClick={onClick}>
      {checked !== undefined && (
        <div className={styles.checkbox}>
          <label aria-label="Checkbox" className={styles.label}>
            <input
              type="checkbox"
              className={styles.input}
              checked={checked}
              onChange={() => {}}
            />
          </label>
        </div>
      )}
      {avatar ? (
        <LazyImage src={avatar} alt="Аватар" imageStyle={styles.avatar} />
      ) : (
        <div className={styles.avatar}>
          {getInitials(firstName + ' ' + lastName)}
        </div>
      )}
      <div className={styles['contact-info__info']}>
        <p className={styles['contact-info__name']}>
          {firstName + ' ' + lastName}
        </p>
        <p className={styles['contact-info__status']}>
          {getUserStatus(isOnline, lastOnlineAt)}
        </p>
      </div>
    </button>
  );
};
