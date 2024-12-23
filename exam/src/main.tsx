import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import 'normalize.css';
import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { ROUTES } from './shared/routes';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HistoryPage } from './pages/HistoryPage/HistoryPage';
import { TranslatePage } from './pages/TranslatePage/TranslatePage';
import { store } from './shared/store';

const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    children: [
      { index: true, element: <Navigate to={ROUTES.TRANSLATE} /> },
      { path: ROUTES.TRANSLATE, element: <TranslatePage /> },
      {
        path: ROUTES.HISTORY,
        element: <HistoryPage />,
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
