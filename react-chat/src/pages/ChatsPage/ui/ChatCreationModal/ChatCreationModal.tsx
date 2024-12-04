import {
  //Group,
  Person,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/routes/ROUTES';

import styles from './ChatCreationModal.module.scss';

const MODAL_CONFIG = [
  {
    title: 'Private chat',
    type: 'private',
    Icon: Person,
    route: ROUTES.CREATE_PRIVATE_CHAT,
  },
  // TODO доделать групповой чат
  // {
  //   title: 'Group chat',
  //   type: 'group',
  //   Icon: Group,
  //   route: ROUTES.CREATE_GROUP_CHAT,
  // },
];

export const ChatCreationModal = () => {
  return (
    <ul className={styles.wrap}>
      {MODAL_CONFIG.map(({ title, Icon, route }, i) => (
        <li key={i}>
          <Link to={`/${route}`} className={styles.link}>
            <Icon />
            <span>{title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
