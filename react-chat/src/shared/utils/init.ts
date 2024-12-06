import {
  Centrifuge,
  ConnectionTokenContext,
  PublicationContext,
} from 'centrifuge';

import { MessageRetrieveApiResponse } from '@/store/api';
import { enhancedApi } from '@/store/enhancedApi';
import { TAGS_CONFIG } from '@/store/tagsConfig';

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
  currentUserId: string,
  activeChatId?: string,
  dispatch?: any,
) => {
  const centrifuge = new Centrifuge(
    'wss://vkedu-fullstack-div2.ru/connection/websocket/',
    {
      getToken: getTokenForConnection,
    },
  );

  const subscription = centrifuge.newSubscription(currentUserId, {
    getToken: getTokenForSubscription,
  });

  subscription.on('publication', function (ctx: IPublicationCreateMessage) {
    if (ctx.data.event !== 'create') {
      return;
    }

    dispatch(enhancedApi.util.invalidateTags([TAGS_CONFIG.MESSAGES]));

    if (!activeChatId) {
      dispatch(enhancedApi.util.invalidateTags([TAGS_CONFIG.CHATS]));
    }

    if (
      currentUserId === ctx.data.message.sender.id ||
      activeChatId === ctx.data.message.chat
    )
      return;

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
