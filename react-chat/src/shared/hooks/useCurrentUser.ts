import { useContext } from 'react';

import { CurrentUserContext } from '../utils/context';

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    throw new Error('User is undefined');
  }

  return currentUser;
};
