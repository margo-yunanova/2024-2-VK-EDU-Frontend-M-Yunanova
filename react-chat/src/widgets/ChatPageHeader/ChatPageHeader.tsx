import { ArrowBack, MoreVert, Search } from '@mui/icons-material';
import { FC, useContext } from 'react';

import { Header } from '@/entities/Header/Header';
import { TabsContext } from '@/utils/utils';

import styles from './ChatPageHeader.module.scss';
import { IChatPageHeaderProps } from './ChatPageHeader.props';

export const ChatPageHeader: FC<IChatPageHeaderProps> = ({
  avatar = 'https://w7.pngwing.com/pngs/706/117/png-transparent-njusha-krosh-sovunya-child-%D1%81%D0%BC%D0%B5%D1%88%D0%B0%D1%80%D0%B8%D0%BA%D0%B8-child-text-photography-thumbnail.png',
  name = 'Её звали Нюша',
  status = 'была 2 часа назад',
}) => {
  const { handlePage } = useContext(TabsContext)!;

  return (
    <Header>
      <button className={styles.icon} onClick={handlePage}>
        <ArrowBack />
      </button>
      <div className={styles['user-info']}>
        <img
          className={styles['user-info__avatar']}
          src={avatar}
          alt="аватар пользователя"
        />
        <div className={styles['user-info__info']}>
          <p className={styles['user-info__name']}>{name}</p>
          <p className={styles['user-info__status']}>{status}</p>
        </div>
      </div>
      <div className={styles.icon}>
        <Search />
      </div>{' '}
      <div className={styles.icon}>
        <MoreVert className={styles.icon} />
      </div>
    </Header>
  );
};
