import { FC } from 'react';

import styles from './CounterUnread.module.scss';
import { ICounterUnreadProps } from './CounterUnread.props';

export const CounterUnread: FC<ICounterUnreadProps> = ({ counter }) => (
  <div className={styles.wrap}>
    <p className={styles.counter}>{counter}</p>
  </div>
);
