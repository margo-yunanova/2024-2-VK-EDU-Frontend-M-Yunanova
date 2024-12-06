import cn from 'classnames';
import { FC } from 'react';

import { Ripple } from '../Riiple/Ripple';
import styles from './BurgerButton.module.scss';
import { IBurgerButton } from './BurgerButton.props';

export const BurgerButton: FC<IBurgerButton> = ({
  isBurgerActive,
  onClick,
  extraClassName,
}) => {
  return (
    <button className={cn(styles.button, extraClassName)} onClick={onClick}>
      <div
        className={styles.line}
        data-state={isBurgerActive ? 'open' : 'close'}
      />
      <div
        className={styles.line}
        data-state={isBurgerActive ? 'open' : 'close'}
      />
      <div
        className={styles.line}
        data-state={isBurgerActive ? 'open' : 'close'}
      />
      <Ripple color={'#af5dfc'} duration={2000} />
    </button>
  );
};
