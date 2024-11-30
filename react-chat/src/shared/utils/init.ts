import {
  Centrifuge,
  ConnectionTokenContext,
  PublicationContext,
} from 'centrifuge';

import { MessageRetrieveApiResponse } from '@/store/api';

// TODO заменить на redux state в 9 домашке
export const state: { activeChatId: string | undefined; is_private: boolean } =
  {
    activeChatId: undefined,
    is_private: false,
  };

interface IPublicationCreateMessage extends PublicationContext {
  data: {
    event: 'create' | 'update' | 'delete' | 'read';
    message: MessageRetrieveApiResponse;
  };
}

type GetTokenFunction = (ctx: ConnectionTokenContext) => Promise<string>;

export const connect = (
  getTokenForConnection: GetTokenFunction,
  getTokenForSubscription: GetTokenFunction,
  id: string,
): (() => void) => {
  const centrifuge = new Centrifuge(
    'wss://vkedu-fullstack-div2.ru/connection/websocket/',
    {
      getToken: getTokenForConnection,
    },
  );

  const subscription = centrifuge.newSubscription(id, {
    getToken: getTokenForSubscription,
  });

  subscription.on('publication', function (ctx: IPublicationCreateMessage) {
    if (ctx.data.event !== 'create') {
      return;
    }

    if (state.activeChatId === ctx.data.message.chat) return;

    const newMessage = new Notification(
      `Сообщение от ${ctx.data.message.sender.username}`,
      {
        body: ctx.data.message.text ?? '',
      },
    );

    newMessage.close();
  });

  centrifuge.connect();
  subscription.subscribe();

  return () => {
    centrifuge.disconnect();
    subscription.removeAllListeners();
    subscription.unsubscribe();
  };
};
