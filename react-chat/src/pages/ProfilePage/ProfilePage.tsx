import { AddAPhoto } from '@mui/icons-material';

import { ProfilePageHeader } from '@/widgets/ProfilePageHeader/ProfilePageHeader';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  return (
    <>
      <ProfilePageHeader />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <img
            className={styles.avatar}
            src="https://ru.wikifur.com/w/images/5/54/%D0%9D%D1%8E%D1%88%D0%B0.jpg"
            alt="Аватар"
          />
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
          />
          <input
            className={styles['form-input']}
            type="text"
            placeholder="Username"
            required
            minLength={1}
            name="username"
            id="username"
          />
          <textarea
            className={styles['form-input']}
            rows={4}
            placeholder="Bio"
            name="bio"
            id="bio"
          />
        </form>
      </div>
    </>
  );
};
