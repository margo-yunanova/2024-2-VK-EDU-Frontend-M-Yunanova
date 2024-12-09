import {
  ArrowBack,
  //Search
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Header } from '@/entities/Header/Header';
import { Ripple } from '@/feature/Riiple/Ripple';
import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './PageHeader.module.scss';

export const PageHeader = () => {
  return (
    <Header extraClassName={styles.header}>
      <Link className={styles.icon} to={`/${ROUTES.CHATS}`}>
        <ArrowBack />
        <Ripple color={'#af5dfc'} duration={2000} />
      </Link>
      {/* TODO доделать поиск */}
      {/* <div className={styles.search}>
        <Search />
        <input className={styles.input} type="text" placeholder="Search" />
      </div> */}
    </Header>
  );
};
