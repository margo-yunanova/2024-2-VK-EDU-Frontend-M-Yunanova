import { Create } from '@mui/icons-material';

import styles from './CreatingChatButton.module.scss';

export const CreatingChatButton = ({ onClick }) => {
  return (
    <button className={styles['creating-chat']} onClick={onClick}>
      <Create />
    </button>
  );
};
