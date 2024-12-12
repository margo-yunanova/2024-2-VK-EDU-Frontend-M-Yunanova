import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './LazyImage.module.scss';

export interface ILazyImageProps {
  src: string;
  alt: string;
  options?: IntersectionObserverInit;
  containerStyle?: CSSModuleClasses[string];
  imageStyle?: CSSModuleClasses[string];
}

export const LazyImage: FC<ILazyImageProps> = ({
  src,
  alt,
  options,
  containerStyle,
  imageStyle,
}) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    }, options);
    if (!placeholderRef.current) return;

    observer.observe(placeholderRef.current);
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return (
    <div className={cn(styles.wrap, containerStyle)}>
      {inView ? (
        <img className={cn(styles.image, imageStyle)} src={src} alt={alt} />
      ) : (
        <div className={styles.placeholder} ref={placeholderRef} />
      )}
    </div>
  );
};
