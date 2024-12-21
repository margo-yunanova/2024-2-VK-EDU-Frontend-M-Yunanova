import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { connect } from '@/shared/utils/init';

function App() {
  const currentUser = useCurrentUser();

  useEffect(() => {
    const unmounter = connect(currentUser.id);

    return () => {
      unmounter();
    };
  }, [currentUser.id]);

  useEffect(() => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return <Outlet />;
}

export default App;
