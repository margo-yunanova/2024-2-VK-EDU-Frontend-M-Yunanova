import { createContext } from 'react';

import { UserPartialUpdateApiResponse } from '@/store/api';

interface ITabsContext {
  activePage: 'chatPage' | 'chatsPage';
  handlePage: () => void;
}
export const TabsContext = createContext<ITabsContext | null>(null);

export const CurrentUserContext = createContext<
  UserPartialUpdateApiResponse | undefined
>(undefined);
