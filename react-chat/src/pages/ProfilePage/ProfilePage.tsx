import { AddAPhoto } from '@mui/icons-material';
import { ChangeEvent, FormEventHandler, useState } from 'react';

import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { useForm } from '@/shared/hooks/useForm';
import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { Button } from '@/shared/ui/Button/Button';
import { TextInputFormField } from '@/shared/ui/TextInputFormField/TextInputFormField';
import { PatchedUser, useUserPartialUpdateMutation } from '@/store/api';
import { ProfilePageHeader } from '@/widgets/ProfilePageHeader/ProfilePageHeader';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const { formData, handleChange: handleChangeFormField } =
    useForm<PatchedUser | null>(null);
  const [onSubmit, { isLoading, error }] = useUserPartialUpdateMutation();
  const [isFormChanged, setFormChanged] = useState<
    Partial<Record<keyof PatchedUser, boolean>>
  >({});

  useWindowTitle('Profile');

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!formData) return;

    onSubmit({ patchedUser: formData, id: currentUser?.id });
    setFormChanged({});
  };

  const formErrors =
    (error && 'data' in error && (error.data as { [key: string]: string })) ||
    {};

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormChanged({
      ...isFormChanged,
      [name]: true,
    });
    handleChangeFormField(e);
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
              onChange={handleChange('avatar')}
              accept="image/*"
            />
          </label>
          <span className={styles.error}>
            {!isFormChanged.avatar && formErrors?.avatar}&nbsp;
          </span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fullName}>
            <div className={styles['input-wrap']}>
              <TextInputFormField
                type="text"
                placeholder="First name"
                required
                minLength={1}
                name="first_name"
                id="first_name"
                defaultValue={currentUser.first_name}
                onChange={handleChange('first_name')}
              />

              <span className={styles.error}>
                {!isFormChanged.first_name && formErrors?.first_name}&nbsp;
              </span>
            </div>
            <div className={styles['input-wrap']}>
              <TextInputFormField
                type="text"
                placeholder="Last name"
                required
                minLength={1}
                name="last_name"
                id="last_name"
                defaultValue={currentUser.last_name}
                onChange={handleChange('last_name')}
              />

              <span className={styles.error}>
                {!isFormChanged.last_name && formErrors?.last_name}&nbsp;
              </span>
            </div>
          </div>
          <div className={styles['input-wrap']}>
            <TextInputFormField
              type="text"
              placeholder="Username"
              required
              minLength={1}
              name="username"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange('username')}
            />
            <span className={styles.error}>
              {!isFormChanged.username && formErrors?.username}&nbsp;
            </span>
          </div>
          <div className={styles['input-wrap']}>
            <TextInputFormField
              type="text"
              placeholder="Bio"
              name="bio"
              id="bio"
              defaultValue={currentUser.bio ?? ''}
              onChange={handleChange('bio')}
            />
            <span className={styles.error}>
              {!isFormChanged.bio && formErrors?.bio}&nbsp;
            </span>
          </div>
          <Button variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save'}
          </Button>
        </form>
      </div>
    </>
  );
};
