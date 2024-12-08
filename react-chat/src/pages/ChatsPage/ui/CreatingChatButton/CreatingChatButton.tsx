import { Create } from '@mui/icons-material';
import { FC } from 'react';

import styles from './CreatingChatButton.module.scss';
import { ICreatingChatButtonProps } from './CreatingChatButton.props';

export const CreatingChatButton: FC<ICreatingChatButtonProps> = ({
  onClick,
}) => {
  return (
    <button className={styles['creating-chat']} onClick={onClick}>
      <Create />
    </button>
  );
};
