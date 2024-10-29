import { ArrowBack, Check } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';
import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './ProfilePageHeader.module.scss';

export const ProfilePageHeader = () => {
  return (
    <Header extraClassName={styles.header}>
      <Link className={styles.icon} to={`/${ROUTES.CHATS}`}>
        <ArrowBack />
        <Ripple color={'#af5dfc'} duration={2000} />
      </Link>
      <p className={styles['header-title']}>Edit Profile</p>
      <button className={styles.icon}>
        <Check />
        <Ripple color={'#af5dfc'} duration={2000} />
      </button>
    </Header>
  );
};
