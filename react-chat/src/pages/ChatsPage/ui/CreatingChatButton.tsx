import { Create } from '@mui/icons-material';

import styles from './CreatingChatButton.module.scss';

export const CreatingChatButton = () => {
  return (
    <button className={styles['creating-chat']}>
      <Create />
    </button>
  );
};
