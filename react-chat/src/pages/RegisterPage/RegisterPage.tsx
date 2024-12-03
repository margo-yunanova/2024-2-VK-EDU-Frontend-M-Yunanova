import { AddAPhoto } from '@mui/icons-material';
import { FormEventHandler, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@/shared/hooks/useForm';
import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { ROUTES } from '@/shared/routes/ROUTES';
import { UserCreateWrite, useRegisterCreateMutation } from '@/store/api';

import styles from './RegisterPage.module.scss';

type TField = {
  name: keyof UserCreateWrite;
  label: string;
  type: 'text' | 'password' | 'url';
};

const formFields: TField[] = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'first_name', label: 'First name', type: 'text' },
  { name: 'last_name', label: 'Last name', type: 'text' },
  { name: 'bio', label: 'Bio', type: 'text' },
];

export const RegisterPage = () => {
  const { formData, handleChange } = useForm<UserCreateWrite | null>(null);
  const [registerUser, { isSuccess }] = useRegisterCreateMutation();
  const navigate = useNavigate();
  useWindowTitle('Register');

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!formData) return;
    try {
      await registerUser({ userCreate: formData });
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${ROUTES.LOGIN}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles['title-wrapper']}>
          <h1 className={styles.title}>Hello</h1>
          <span className={styles.subtitle}>Join to us</span>
        </div>

        <span>
          Already have an account?{' '}
          <Link to={`/${ROUTES.LOGIN}`} className={styles.link}>
            Sing in
          </Link>
        </span>

        <div className={styles['or-wrapper']}>
          <hr className={styles['or-line']} />
          <span className={styles.or}>OR</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {formFields.map(({ name, label, type }) => (
            <label htmlFor={name} className={styles.label} key={name}>
              <span>{label}</span>
              <input
                className={styles['form-input']}
                type={type}
                required={name !== 'avatar' && name !== 'bio'}
                name={name}
                id={name}
                onChange={handleChange}
                value={formData?.[name] ?? ''}
                autoComplete={type === 'password' ? 'new-password' : 'on'}
              />
            </label>
          ))}
          <label htmlFor="avatar" className={styles.label}>
            Avatar
            <div className={styles['form-input']}>
              <AddAPhoto />
            </div>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleChange}
              hidden
            />
          </label>
          <button className={styles.button} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
