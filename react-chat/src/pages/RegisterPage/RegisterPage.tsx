import { AddAPhoto } from '@mui/icons-material';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@/shared/hooks/useForm';
import { useWindowTitle } from '@/shared/hooks/useWindowTitle';
import { ROUTES } from '@/shared/routes/ROUTES';
import { Button } from '@/shared/ui/Button/Button';
import { TextInputFormField } from '@/shared/ui/TextInputFormField/TextInputFormField';
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
  useWindowTitle('Register');
  const { formData, handleChange: handleChangeFormField } =
    useForm<UserCreateWrite | null>(null);
  const [registerUser, { isSuccess, error, isLoading }] =
    useRegisterCreateMutation();
  const navigate = useNavigate();
  const [isFormChanged, setFormChanged] = useState<
    Partial<Record<keyof UserCreateWrite, boolean>>
  >({});

  const formErrors =
    (error && 'data' in error && (error.data as { [key: string]: string })) ||
    {};

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!formData) return;
    try {
      await registerUser({ userCreate: formData });
      setFormChanged({});
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

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormChanged({
      ...isFormChanged,
      [name]: true,
    });
    handleChangeFormField(e);
  };
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
            <div className={styles.field} key={name}>
              <TextInputFormField
                label={label}
                type={type}
                required={name !== 'avatar' && name !== 'bio'}
                name={name}
                id={name}
                onChange={handleChange(name)}
                value={formData?.[name] ?? ''}
                autoComplete={type === 'password' ? 'new-password' : 'on'}
              />

              <span className={styles.error}>
                {!isFormChanged[name] && formErrors?.[name]}&nbsp;
              </span>
            </div>
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
              onChange={handleChangeFormField}
              hidden
            />
          </label>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  );
};
