import { FC, MouseEventHandler } from 'react';

import { formateDate, getInitials } from '@/shared/utils/utils';

import { LazyImage } from '../LazyImage/LazyImage';
import styles from './ContactCard.module.scss';
import { IContactCard } from './ContactCard.props';

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

export const ContactCard: FC<IContactCard> = ({
  id,
  avatar,
  firstName,
  lastName,
  isOnline,
  lastOnlineAt,
  onClick,
  onHandleCheckbox,
}) => {
  const getUserStatus = (is_online: boolean, last_online_at: string) =>
    is_online
      ? 'Online'
      : 'Last online ' +
        formateDate(new Date(last_online_at), 'ru', timeFormatOptions);

  const handleCheckBox: MouseEventHandler = (e) => {
    if (onHandleCheckbox === undefined) return;

    e.stopPropagation();
    onHandleCheckbox();
  };
  return (
    <button className={styles.contact} onClick={() => onClick(id)}>
      {!onHandleCheckbox && (
        <button className={styles.checkbox} onClick={handleCheckBox}>
          <label aria-label="Checkbox" className={styles.label}>
            <input type="checkbox" className={styles.input} />
          </label>
        </button>
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
