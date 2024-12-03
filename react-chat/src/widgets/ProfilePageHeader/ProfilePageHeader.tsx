import { ArrowBack, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';
import { useAppDispatch } from '@/shared/hooks/stateHooks';
import { ROUTES } from '@/shared/routes/ROUTES';
import { enhancedApi } from '@/store/enhancedApi';

import styles from './ProfilePageHeader.module.scss';

export const ProfilePageHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate(`/${ROUTES.LOGIN}`, { replace: true });
    dispatch(enhancedApi.util.resetApiState());
  };

  return (
    <Header extraClassName={styles.header}>
      <Link className={styles.icon} to={`/${ROUTES.CHATS}`}>
        <ArrowBack />
        <Ripple color={'#af5dfc'} duration={2000} />
      </Link>
      <p className={styles['header-title']}>Edit Profile</p>
      <button className={styles.icon} onClick={handleLogout}>
        <Logout />
        <p>Log out</p>
        <Ripple color={'#af5dfc'} duration={2000} />
      </button>
    </Header>
  );
};
