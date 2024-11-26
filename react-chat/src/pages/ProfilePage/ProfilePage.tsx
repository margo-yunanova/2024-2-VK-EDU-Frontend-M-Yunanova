import { AddAPhoto } from '@mui/icons-material';

import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { ProfilePageHeader } from '@/widgets/ProfilePageHeader/ProfilePageHeader';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <ProfilePageHeader />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.avatar}>
            <img src={currentUser?.avatar ?? ''} alt="Аватар" />
          </div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <div className={styles.overlay}></div>
          <label htmlFor="file" className={styles.file}>
            <AddAPhoto />
            <input name="file" id="file" type="file" hidden />
          </label>
        </div>

        <form className={styles.form}>
          <input
            className={styles['form-input']}
            type="text"
            placeholder="FullName"
            required
            minLength={1}
            name="fullName"
            id="fullName"
            defaultValue={currentUser.first_name + ' ' + currentUser.last_name}
          />
          <input
            className={styles['form-input']}
            type="text"
            placeholder="Username"
            required
            minLength={1}
            name="username"
            id="username"
            defaultValue={currentUser.username}
          />
          <textarea
            className={styles['form-input']}
            rows={4}
            placeholder="Bio"
            name="bio"
            id="bio"
            defaultValue={currentUser.bio ?? ''}
          />
        </form>
      </div>
    </>
  );
};
