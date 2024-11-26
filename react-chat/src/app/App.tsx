import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/routes/ROUTES';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(ROUTES.CHATS);

    // because navigate is not a stable link and triggered on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Outlet />;
}

export default App;
