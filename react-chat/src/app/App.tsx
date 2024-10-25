import { useState } from 'react';

import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ChatsPage } from '@/pages/ChatsPage/ChatsPage';
import { TabsContext } from '@/utils/utils';

function App() {
  const [activePage, setActivePage] = useState<'chatPage' | 'chatsPage'>(
    'chatPage',
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
