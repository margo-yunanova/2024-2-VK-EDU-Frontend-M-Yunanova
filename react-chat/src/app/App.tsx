import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/stateHooks';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { connect } from '@/shared/utils/init';
import {
  useCentrifugoConnectCreateMutation,
  useCentrifugoSubscribeCreateMutation,
} from '@/store/api';

function App() {
  const currentUser = useCurrentUser();
  const activeChatId = useAppSelector((state) => state.chat.activeChat?.id);
  const [getTokenForConnection] = useCentrifugoConnectCreateMutation();
  const [getTokenForSubscription] = useCentrifugoSubscribeCreateMutation();

  useEffect(() => {
    const unmounter = connect(
      async () => (await getTokenForConnection()).data!.token,
      async () => (await getTokenForSubscription()).data!.token,
      currentUser.id,
      activeChatId,
    );

    return () => {
      unmounter();
    };
  }, [
    currentUser,
    getTokenForConnection,
    getTokenForSubscription,
    activeChatId,
  ]);

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
