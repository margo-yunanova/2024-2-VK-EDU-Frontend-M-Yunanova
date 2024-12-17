import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { ChatPage } from '@/pages/ChatPage/ChatPage';
import { ChatsPage } from '@/pages/ChatsPage/ChatsPage';
import { CreatingGroupChatPage } from '@/pages/CreatingGroupChatPage/CreatingGroupChatPage';
import { CreatingPrivateChatPage } from '@/pages/CreatingPrivateChatPage/CreatingPrivateChatPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { RegisterPage } from '@/pages/RegisterPage/RegisterPage';
import { CurrentUserProvider } from '@/shared/context/CurrentUserContext';
import { ROUTES } from '@/shared/routes/ROUTES';
import store from '@/store/store';

import App from './App';

const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    ),
    children: [
      { index: true, element: <Navigate to={ROUTES.CHATS} /> },
      { path: ROUTES.CHATS, element: <ChatsPage /> },
      {
        path: ROUTES.CHAT(':id'),
        element: <ChatPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.CREATE_PRIVATE_CHAT,
        element: <CreatingPrivateChatPage />,
      },
      {
        path: ROUTES.CREATE_GROUP_CHAT,
        element: <CreatingGroupChatPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
