import { Close, Contacts, Person, Settings } from '@mui/icons-material';
import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './BurgerMenu.module.scss';
import { IBurgerMenuProps } from './BurgerMenu.props';

const burgerMenu = [
  {
    id: 1,
    title: 'Profile',
    path: ROUTES.PROFILE,
    icon: Person,
  },
  {
    id: 2,
    title: 'Settings',
    path: ROUTES.CHATS,
    icon: Settings,
  },
  {
    id: 3,
    title: 'Contacts',
    path: ROUTES.CHATS,
    icon: Contacts,
  },
];

export const BurgerMenu: FC<IBurgerMenuProps> = ({ isOpen, close }) => {
  return (
    <div className={cn(styles.wrapper, { [styles['wrapper-active']]: isOpen })}>
      <button className={styles.button} onClick={close}>
        <Close />
      </button>
      <ul className={styles.list}>
        {burgerMenu.map((item) => (
          <li className={styles.item} key={item.id}>
            <item.icon />
            <Link to={`/${item.path}`} className={styles.link}>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};