import { useEffect } from 'react';

export const useWindowTitle = (title: string) => {
  useEffect(() => {
    const currentTitle = document.title;
    document.title = title;

    return () => {
      document.title = currentTitle;
    };
  }, [title]);
};
