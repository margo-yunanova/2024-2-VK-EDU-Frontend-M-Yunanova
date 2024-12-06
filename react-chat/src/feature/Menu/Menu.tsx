import { Contacts, Person, Settings } from '@mui/icons-material';
import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './Menu.module.scss';
import { IMenuProps } from './Menu.props';

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

export const Menu: FC<IMenuProps> = ({ isOpen }) => {
  return (
    <div className={cn(styles.wrapper, { [styles['wrapper-active']]: isOpen })}>
      <ul className={styles.list}>
        {burgerMenu.map((item) => (
          <li className={styles.item} key={item.id}>
            <Link to={`/${item.path}`} className={styles.link}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
