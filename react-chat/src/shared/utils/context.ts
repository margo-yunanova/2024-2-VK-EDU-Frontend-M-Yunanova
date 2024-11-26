import { createContext } from 'react';

interface ITabsContext {
  activePage: 'chatPage' | 'chatsPage';
  handlePage: () => void;
}
export const TabsContext = createContext<ITabsContext | null>(null);
