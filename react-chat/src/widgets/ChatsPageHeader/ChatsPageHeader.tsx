import { Menu, Search } from '@mui/icons-material';

import { Header } from '@/entities/Header/Header';

import styles from './ChatsPageHeader.module.scss';

export const ChatsPageHeader = () => {
  return (
    <Header extraClassName={styles.header}>
      <nav className="settings">
        <button className={styles.icon}>
          <Menu />
        </button>
      </nav>
      <p className={styles['header-title']}>Messenger</p>
      <button className={styles.icon}>
        <Search />
      </button>
    </Header>
  );
};
