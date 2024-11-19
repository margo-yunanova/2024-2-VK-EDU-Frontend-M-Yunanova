import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useUserCurrentRetrieveQuery } from '@/store/api';

import { ROUTES } from '../routes/ROUTES';
import { CurrentUserContext } from '../utils/context';

export interface ICurrentUserProviderProps {
  children: React.ReactNode;
}

export const CurrentUserProvider: FC<ICurrentUserProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { data, isFetching } = useUserCurrentRetrieveQuery();

  useEffect(() => {
    if (data) {
      navigate('/' + ROUTES.CHATS);
    }

    if (!isFetching && !data) {
      navigate('/' + ROUTES.LOGIN);
    }
  }, [data, isFetching]);

  return (
    <CurrentUserContext.Provider value={data}>
      {children}
    </CurrentUserContext.Provider>
  );
};
