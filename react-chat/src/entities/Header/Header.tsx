import cn from 'classnames';
import { FC } from 'react';

import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';

export const Header: FC<HeaderProps> = ({ children, extraClassName }) => {
  return (
    <header className={cn(styles.header, extraClassName)}>{children}</header>
  );
};
