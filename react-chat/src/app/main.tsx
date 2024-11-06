import './styles/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ChatsPage } from '@/pages/ChatsPage/ChatsPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { ROUTES } from '@/shared/routes/ROUTES';
import { store } from '@/store/store';

import App from './App';

const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    children: [
      {
        path: ROUTES.CHATS,
        element: <ChatsPage />,
      },
      {
        path: ROUTES.CHAT,
        element: <ChatPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
