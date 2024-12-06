import { Search } from '@mui/icons-material';
import { FC } from 'react';

import { Header } from '@/entities/Header/Header';
import { BurgerButton } from '@/feature/burgerButton/BurgerButton';
import { Ripple } from '@/feature/Riiple/Ripple';

import styles from './ChatsPageHeader.module.scss';
import { IChatPageHeader } from './ChatsPageHeader.props';

export const ChatsPageHeader: FC<IChatPageHeader> = ({
  onClick,
  isBurgerActive,
}) => {
  return (
    <Header extraClassName={styles.header}>
      <BurgerButton
        onClick={onClick}
        isBurgerActive={isBurgerActive ?? false}
      />
      <p className={styles['header-title']}>Messenger</p>
      <button className={styles.icon}>
        <Search />
        <Ripple color={'#af5dfc'} duration={2000} />
      </button>
    </Header>
  );
};
