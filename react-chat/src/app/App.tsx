import { useState } from 'react';

import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ChatsPage } from '@/pages/ChatsPage/ChatsPage';
import { TabsContext } from '@/shared/utils/context';

function App() {
  const [activePage, setActivePage] = useState<'chatPage' | 'chatsPage'>(
    'chatsPage',
  );

  const handlePage = () => {
    setActivePage((page) => (page === 'chatPage' ? 'chatsPage' : 'chatPage'));
  };

  return (
    <TabsContext.Provider value={{ activePage, handlePage }}>
      {activePage === 'chatPage' ? <ChatPage /> : <ChatsPage />}
    </TabsContext.Provider>
  );
}

export default App;
