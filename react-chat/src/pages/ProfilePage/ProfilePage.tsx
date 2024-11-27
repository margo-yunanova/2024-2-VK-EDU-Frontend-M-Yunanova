import { AddAPhoto } from '@mui/icons-material';
import { FormEventHandler } from 'react';

import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { useForm } from '@/shared/hooks/useForm';
import { PatchedUser, useUserPartialUpdateMutation } from '@/store/api';
import { ProfilePageHeader } from '@/widgets/ProfilePageHeader/ProfilePageHeader';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const { formData, handleChange } = useForm<PatchedUser | null>(null);
  const [onSubmit, { isLoading }] = useUserPartialUpdateMutation();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!formData) return;

    try {
      await onSubmit({ patchedUser: formData, id: currentUser?.id });
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
  };

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
          <label htmlFor="avatar" className={styles.file}>
            <AddAPhoto />
            <input
              name="avatar"
              id="avatar"
              type="file"
              hidden
              onChange={handleChange}
            />
          </label>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fullname}>
            <input
              className={styles['form-input']}
              type="text"
              placeholder="First name"
              required
              minLength={1}
              name="first_name"
              id="first_name"
              defaultValue={currentUser.first_name}
              onChange={handleChange}
            />
            <input
              className={styles['form-input']}
              type="text"
              placeholder="Last name"
              required
              minLength={1}
              name="last_name"
              id="last_name"
              defaultValue={currentUser.last_name}
              onChange={handleChange}
            />
          </div>
          <input
            className={styles['form-input']}
            type="text"
            placeholder="Username"
            required
            minLength={1}
            name="username"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            className={styles['form-input']}
            type="text"
            placeholder="Bio"
            name="bio"
            id="bio"
            defaultValue={currentUser.bio ?? ''}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit" disabled={isLoading}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};
