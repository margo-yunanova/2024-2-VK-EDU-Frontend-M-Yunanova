import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useLayoutEffect,
  useState,
} from 'react';

import styles from './Ripple.module.scss';
import { IRipple, IRippleDimensions } from './Ripple.props';

export const Ripple: FC<IRipple> = ({ color, duration }) => {
  const [rippleArray, setRippleArray] = useState<IRippleDimensions[]>([]);

  useLayoutEffect(() => {
    let bounce: null | NodeJS.Timeout = null;

    if (rippleArray.length > 0) {
      clearTimeout(bounce!);

      bounce = setTimeout(() => {
        setRippleArray([]);
        clearTimeout(bounce!);
      }, duration * 2);
    }
    return () => clearTimeout(bounce!);
  }, [duration, rippleArray.length]);

  type TAddRipple<K> = (event: K) => void;

  const addRipple: TAddRipple<MouseEvent> = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple: IRippleDimensions = { x, y, size };
    setRippleArray([...rippleArray, newRipple]);
  };

  const handleKeyDown: TAddRipple<KeyboardEvent> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      addRipple(event as unknown as MouseEvent);
    }
  };

  return (
    <div
      className={styles.wrap}
      onMouseDown={addRipple}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Элемент с рябью"
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'span' + index}
              className={styles.ripple}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: color,
                animationDuration: `${duration}ms`,
              }}
            />
          );
        })}
    </div>
  );
};
