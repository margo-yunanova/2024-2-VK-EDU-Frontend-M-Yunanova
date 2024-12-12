import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useUserCurrentRetrieveQuery } from '@/store/api';

import { ROUTES } from '../routes/ROUTES';
import { Loader } from '../ui/Loader/Loader';
import { CurrentUserContext } from '../utils/context';

export interface ICurrentUserProviderProps {
  children: React.ReactNode;
}

export const CurrentUserProvider: FC<ICurrentUserProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useUserCurrentRetrieveQuery();

  useEffect(() => {
    if (!data && !isLoading) {
      navigate('/' + ROUTES.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  return (
    <>
      {data ? (
        <CurrentUserContext.Provider value={data}>
          {children}
        </CurrentUserContext.Provider>
      ) : (
        <Loader />
      )}
    </>
  );
};
