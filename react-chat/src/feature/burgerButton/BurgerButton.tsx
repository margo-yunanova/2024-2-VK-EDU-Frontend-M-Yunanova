import cn from 'classnames';
import { FC } from 'react';

import { Ripple } from '../Ripple/Ripple';
import styles from './BurgerButton.module.scss';
import { IBurgerButton } from './BurgerButton.props';

export const BurgerButton: FC<IBurgerButton> = ({
  isBurgerActive,
  onClick,
  extraClassName,
}) => {
  return (
    <button
      className={cn(styles.button, extraClassName)}
      onClick={onClick}
      data-state={isBurgerActive ? 'open' : 'close'}
    >
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
      <Ripple color={'#af5dfc'} duration={2000} />
    </button>
  );
};
