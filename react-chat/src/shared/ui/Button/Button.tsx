import cn from 'classnames';
import { FC } from 'react';

import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  extraClassName,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, styles[variant], extraClassName)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
