import { ArrowBack, Clear, Search } from '@mui/icons-material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';
import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './CreatingChatHeader.module.scss';
import { ICreatingChatHeader } from './CreatingChatHeader.props';

export const CreatingChatHeader: FC<ICreatingChatHeader> = ({
  value,
  setValue,
}) => {
  return (
    <Header extraClassName={styles.header}>
      <Link className={styles.icon} to={`/${ROUTES.CHATS}`}>
        <ArrowBack />
        <Ripple color={'#af5dfc'} duration={2000} />
      </Link>

      <div className={styles.search}>
        <Search />
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={styles.icon} onClick={() => setValue('')}>
          <Clear />
          <Ripple color={'#af5dfc'} duration={2000} />
        </button>
      </div>
    </Header>
  );
};
