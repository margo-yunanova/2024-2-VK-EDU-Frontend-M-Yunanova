import { injectedRtkApi } from './api';
import { TAGS_CONFIG } from './tagsConfig';

export const enhancedApi = injectedRtkApi.enhanceEndpoints({
  addTagTypes: [...Object.values(TAGS_CONFIG)],
  endpoints: {
    messagesList: {
      providesTags: (result, error, { chat }) => [
        { type: TAGS_CONFIG.MESSAGES, id: chat },
      ],
    },
    chatsList: {
      providesTags: [TAGS_CONFIG.CHATS],
    },
    userCurrentRetrieve: {
      providesTags: [TAGS_CONFIG.PROFILE],
    },
    userPartialUpdate: {
      invalidatesTags: [TAGS_CONFIG.PROFILE],
    },
    chatsCreate: {
      invalidatesTags: [TAGS_CONFIG.CHATS],
    },
  },
});
