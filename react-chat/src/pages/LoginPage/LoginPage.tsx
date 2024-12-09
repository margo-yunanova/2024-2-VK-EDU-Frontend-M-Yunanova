import { FormEventHandler, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@/shared/hooks/useForm';
import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { ROUTES } from '@/shared/routes/ROUTES';
import {
  TokenObtainPairWrite,
  useAuthCreateMutation,
  useUserCurrentRetrieveQuery,
} from '@/store/api';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const { formData, handleChange } = useForm<TokenObtainPairWrite | null>(null);
  const [loginUser, { isSuccess, data }] = useAuthCreateMutation();
  const { data: user, refetch } = useUserCurrentRetrieveQuery();
  const navigate = useNavigate();

  useWindowTitle('Login');

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!formData) return;
    try {
      loginUser({ tokenObtainPair: formData });
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/${ROUTES.CHATS}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      refetch();
      navigate(`/${ROUTES.CHATS}`, { replace: true });
    }
    // because navigate is not a stable link and triggered on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles['title-wrapper']}>
          <h1 className={styles.title}>Hello, Welcome Back</h1>
          <span className={styles.subtitle}>
            Happy to see you again, to use your account please login first.
          </span>
        </div>

        <span>
          Don't have an account?{' '}
          <Link to={`/${ROUTES.REGISTER}`} className={styles.link}>
            Sign up
          </Link>
        </span>

        <div className={styles['or-wrapper']}>
          <hr className={styles['or-line']} />
          <span className={styles.or}>OR</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username" className={styles.label}>
            <span>Username</span>
            <input
              className={styles['form-input']}
              type="text"
              required
              name="username"
              id="username"
              onChange={handleChange}
              value={formData?.username ?? ''}
            />
          </label>
          <label htmlFor="password" className={styles.label}>
            <span>Password</span>
            <input
              className={styles['form-input']}
              type="password"
              required
              name="password"
              id="password"
              onChange={handleChange}
              value={formData?.password ?? ''}
              autoComplete="current-password"
            />
          </label>

          <Link to="#" className={styles.link}>
            Forgot password?
          </Link>

          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
