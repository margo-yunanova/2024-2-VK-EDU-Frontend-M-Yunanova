import { Menu, Search } from '@mui/icons-material';
import { FC } from 'react';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';

import styles from './ChatsPageHeader.module.scss';
import { ChatPageHeaderProps } from './ChatsPageHeader.props';

export const ChatsPageHeader: FC<ChatPageHeaderProps> = ({ onClick }) => {
  return (
    <Header extraClassName={styles.header}>
      <nav className={styles.settings}>
        <button className={styles.icon} onClick={onClick}>
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
