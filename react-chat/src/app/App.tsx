import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { connect } from '@/shared/utils/init';
import {
  useCentrifugoConnectCreateMutation,
  useCentrifugoSubscribeCreateMutation,
} from '@/store/api';

function App() {
  const currentUser = useCurrentUser();
  const [getTokenForConnection] = useCentrifugoConnectCreateMutation();
  const [getTokenForSubscription] = useCentrifugoSubscribeCreateMutation();

  useEffect(() => {
    const unmounter = connect(
      async () => (await getTokenForConnection()).data!.token,
      async () => (await getTokenForSubscription()).data!.token,
      currentUser.id,
    );

    return () => {
      unmounter();
    };
  }, [currentUser, getTokenForConnection, getTokenForSubscription]);

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return <Outlet />;
}

export default App;
