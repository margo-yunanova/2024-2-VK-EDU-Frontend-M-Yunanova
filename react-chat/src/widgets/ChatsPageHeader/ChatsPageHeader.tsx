import { Menu, Search } from '@mui/icons-material';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';

import styles from './ChatsPageHeader.module.scss';

export const ChatsPageHeader = () => {
  return (
    <Header extraClassName={styles.header}>
      <nav className={styles.settings}>
        <button className={styles.icon}>
          <Menu />
          <Ripple color={'#af5dfc'} duration={2000} />
        </button>
      </nav>
      <p className={styles['header-title']}>Messenger</p>
      <button className={styles.icon}>
        <Search />
        <Ripple color={'#af5dfc'} duration={2000} />
      </button>
    </Header>
  );
};
