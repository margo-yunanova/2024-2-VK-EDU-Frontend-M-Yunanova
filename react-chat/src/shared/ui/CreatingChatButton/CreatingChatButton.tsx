import { FC } from 'react';

import styles from './CreatingChatButton.module.scss';
import { ICreatingChatButton } from './CreatingChatButton.props';

export const CreatingChatButton: FC<ICreatingChatButton> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={styles['creating-chat']}
      onClick={onClick}
      aria-label="Creating chat"
      {...props}
    >
      {children}
    </button>
  );
};
