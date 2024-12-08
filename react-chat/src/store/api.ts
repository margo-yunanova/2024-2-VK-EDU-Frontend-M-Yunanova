import { api } from './baseApi';

export const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authCreate: build.mutation<AuthCreateApiResponse, AuthCreateApiArg>({
      query: (queryArg) => ({
        url: `/api/auth/`,
        method: 'POST',
        body: queryArg.tokenObtainPair,
      }),
    }),
    authRefreshCreate: build.mutation<
      AuthRefreshCreateApiResponse,
      AuthRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/refresh/`,
        method: 'POST',
        body: queryArg.tokenRefresh,
      }),
    }),
    centrifugoConnectCreate: build.mutation<
      CentrifugoConnectCreateApiResponse,
      CentrifugoConnectCreateApiArg
    >({
      query: () => ({ url: `/api/centrifugo/connect/`, method: 'POST' }),
    }),
    centrifugoSubscribeCreate: build.mutation<
      CentrifugoSubscribeCreateApiResponse,
      CentrifugoSubscribeCreateApiArg
    >({
      query: () => ({ url: `/api/centrifugo/subscribe/`, method: 'POST' }),
    }),
    chatRetrieve: build.query<ChatRetrieveApiResponse, ChatRetrieveApiArg>({
      query: (queryArg) => ({ url: `/api/chat/${queryArg.id}/` }),
    }),
    chatPartialUpdate: build.mutation<
      ChatPartialUpdateApiResponse,
      ChatPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/chat/${queryArg.id}/`,
        method: 'PATCH',
        body: queryArg.patchedGroupChatPatch,
      }),
    }),
    chatDestroy: build.mutation<ChatDestroyApiResponse, ChatDestroyApiArg>({
      query: (queryArg) => ({
        url: `/api/chat/${queryArg.id}/`,
        method: 'DELETE',
      }),
    }),
    chatLeaveCreate: build.mutation<
      ChatLeaveCreateApiResponse,
      ChatLeaveCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/chat/${queryArg.id}/leave/`,
        method: 'POST',
      }),
    }),
    chatsList: build.query<ChatsListApiResponse, ChatsListApiArg>({
      query: (queryArg) => ({
        url: `/api/chats/`,
        params: {
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    chatsCreate: build.mutation<ChatsCreateApiResponse, ChatsCreateApiArg>({
      query: (queryArg) => ({
        url: `/api/chats/`,
        method: 'POST',
        body: queryArg.body,
        params: {
          fallback: queryArg.fallback,
        },
      }),
    }),
    messageRetrieve: build.query<
      MessageRetrieveApiResponse,
      MessageRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/api/message/${queryArg.id}/` }),
    }),
    messagePartialUpdate: build.mutation<
      MessagePartialUpdateApiResponse,
      MessagePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/message/${queryArg.id}/`,
        method: 'PATCH',
        body: queryArg.patchedMessage,
      }),
    }),
    messageDestroy: build.mutation<
      MessageDestroyApiResponse,
      MessageDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/message/${queryArg.id}/`,
        method: 'DELETE',
      }),
    }),
    messageReadCreate: build.mutation<
      MessageReadCreateApiResponse,
      MessageReadCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/message/${queryArg.id}/read/`,
        method: 'POST',
      }),
    }),
    messagesList: build.query<MessagesListApiResponse, MessagesListApiArg>({
      query: (queryArg) => ({
        url: `/api/messages/`,
        params: {
          chat: queryArg.chat,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    messagesCreate: build.mutation<
      MessagesCreateApiResponse,
      MessagesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/messages/`,
        method: 'POST',
        body: queryArg.messageCreate,
      }),
    }),
    registerCreate: build.mutation<
      RegisterCreateApiResponse,
      RegisterCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/register/`,
        method: 'POST',
        body: queryArg.userCreate,
      }),
    }),
    userCurrentRetrieve: build.query<
      UserCurrentRetrieveApiResponse,
      UserCurrentRetrieveApiArg
    >({
      query: () => ({ url: `/api/user/current/` }),
    }),
    userRetrieve: build.query<UserRetrieveApiResponse, UserRetrieveApiArg>({
      query: (queryArg) => ({ url: `/api/user/${queryArg.id}/` }),
    }),
    userPartialUpdate: build.mutation<
      UserPartialUpdateApiResponse,
      UserPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user/${queryArg.id}/`,
        method: 'PATCH',
        body: queryArg.patchedUser,
      }),
    }),
    userDestroy: build.mutation<UserDestroyApiResponse, UserDestroyApiArg>({
      query: (queryArg) => ({
        url: `/api/user/${queryArg.id}/`,
        method: 'DELETE',
      }),
    }),
    userOfflineCreate: build.mutation<
      UserOfflineCreateApiResponse,
      UserOfflineCreateApiArg
    >({
      query: () => ({ url: `/api/user/offline/`, method: 'POST' }),
    }),
    userOnlineCreate: build.mutation<
      UserOnlineCreateApiResponse,
      UserOnlineCreateApiArg
    >({
      query: () => ({ url: `/api/user/online/`, method: 'POST' }),
    }),
    usersList: build.query<UsersListApiResponse, UsersListApiArg>({
      query: (queryArg) => ({
        url: `/api/users/`,
        params: {
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type AuthCreateApiResponse = /** status 200  */ TokenObtainPairRead;
export type AuthCreateApiArg = {
  tokenObtainPair: TokenObtainPairWrite;
};
export type AuthRefreshCreateApiResponse = /** status 200  */ TokenRefreshRead;
export type AuthRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh;
};
export type CentrifugoConnectCreateApiResponse =
  /** status 200  */ TokenCentrifugo;
export type CentrifugoConnectCreateApiArg = void;
export type CentrifugoSubscribeCreateApiResponse =
  /** status 200  */ TokenCentrifugo;
export type CentrifugoSubscribeCreateApiArg = void;
export type ChatRetrieveApiResponse = /** status 200  */ ChatRead;
export type ChatRetrieveApiArg = {
  id: string;
};
export type ChatPartialUpdateApiResponse =
  /** status 200  */ GroupChatPatchRead;
export type ChatPartialUpdateApiArg = {
  id: string;
  patchedGroupChatPatch: PatchedGroupChatPatch;
};
export type ChatDestroyApiResponse = unknown;
export type ChatDestroyApiArg = {
  id: string;
};
export type ChatLeaveCreateApiResponse = unknown;
export type ChatLeaveCreateApiArg = {
  id: string;
};
export type ChatsListApiResponse = /** status 200  */ PaginatedChatListRead;
export type ChatsListApiArg = {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
  /** A search term. */
  search?: string;
};
export type ChatsCreateApiResponse = /** status 201  */ ChatRead;
export type ChatsCreateApiArg = {
  /** A flag. If set to `on`, then on attempt to create existing private chat it will return existing one instead of throwing exception. */
  fallback?: 'on' | 'off';
  body: {
    /** A list of chat members */
    members?: string[];
    /** Is chat private */
    is_private?: boolean;
    /** Chat title (can be null) */
    title?: string | null;
    /** Chat avatar (can be null) */
    avatar?: Blob | null;
  };
};
export type MessageRetrieveApiResponse = /** status 200  */ MessageRead;
export type MessageRetrieveApiArg = {
  id: string;
};
export type MessagePartialUpdateApiResponse = /** status 200  */ MessageRead;
export type MessagePartialUpdateApiArg = {
  id: string;
  patchedMessage: PatchedMessage;
};
export type MessageDestroyApiResponse = unknown;
export type MessageDestroyApiArg = {
  id: string;
};
export type MessageReadCreateApiResponse = /** status 200  */ MessageRead;
export type MessageReadCreateApiArg = {
  id: string;
};
export type MessagesListApiResponse =
  /** status 200  */ PaginatedMessageListRead;
export type MessagesListApiArg = {
  /** A chatId. */
  chat: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
  /** A search term. */
  search?: string;
};
export type MessagesCreateApiResponse = /** status 201  */ MessageCreateRead;
export type MessagesCreateApiArg = {
  messageCreate: MessageCreate;
};
export type RegisterCreateApiResponse = /** status 201  */ UserCreateRead;
export type RegisterCreateApiArg = {
  userCreate: UserCreateWrite;
};
export type UserCurrentRetrieveApiResponse = /** status 200  */ UserRead;
export type UserCurrentRetrieveApiArg = void;
export type UserRetrieveApiResponse = /** status 200  */ UserRead;
export type UserRetrieveApiArg = {
  /** A UUID string identifying this user. */
  id: string;
};
export type UserPartialUpdateApiResponse = /** status 200  */ UserRead;
export type UserPartialUpdateApiArg = {
  /** A UUID string identifying this user. */
  id: string;
  patchedUser: PatchedUser;
};
export type UserDestroyApiResponse = unknown;
export type UserDestroyApiArg = {
  /** A UUID string identifying this user. */
  id: string;
};
export type UserOfflineCreateApiResponse = unknown;
export type UserOfflineCreateApiArg = void;
export type UserOnlineCreateApiResponse = unknown;
export type UserOnlineCreateApiArg = void;
export type UsersListApiResponse = /** status 200  */ PaginatedUserListRead;
export type UsersListApiArg = {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
  /** A search term. */
  search?: string;
};
export type TokenObtainPair = {};
export type TokenObtainPairRead = {
  access: string;
  refresh: string;
};
export type TokenObtainPairWrite = {
  username: string;
  password: string;
};
export type TokenRefresh = {
  refresh: string;
};
export type TokenRefreshRead = {
  access: string;
  refresh: string;
};
export type TokenCentrifugo = {
  token: string;
};
export type User = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
};
export type UserRead = {
  id: string;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
  is_online: boolean;
  last_online_at: string;
};
export type MessageFile = {
  item?: string | null;
};
export type LastMessage = {
  chat?: string;
  created_at?: string;
  files?: MessageFile[];
  id?: string;
  sender?: User;
  text?: string;
  updated_at?: string | null;
  voice?: string | null;
  was_read_by?: User[];
};
export type LastMessageRead = {
  chat?: string;
  created_at?: string;
  files?: MessageFile[];
  id?: string;
  sender?: UserRead;
  text?: string;
  updated_at?: string | null;
  voice?: string | null;
  was_read_by?: UserRead[];
};
export type Chat = {
  members: User[];
  creator: User;
  is_private: boolean;
  last_message: LastMessage;
  unread_messages_count: number;
};
export type ChatRead = {
  id: string;
  title: string;
  members: UserRead[];
  creator: UserRead;
  avatar?: string | null;
  created_at: string;
  updated_at: string;
  is_private: boolean;
  last_message: LastMessageRead;
  unread_messages_count: number;
};
export type GroupChatPatch = {
  title: string;
  members: User[];
  creator: User;
  avatar?: string | null;
  last_message?: LastMessage;
  unread_messages_count: number;
};
export type GroupChatPatchRead = {
  id: string;
  title: string;
  members: UserRead[];
  creator: UserRead;
  avatar?: string | null;
  created_at: string;
  updated_at: string;
  is_private: boolean;
  last_message?: LastMessageRead;
  unread_messages_count: number;
};
export type PatchedGroupChatPatch = {
  title?: string;
  members?: string[];
  avatar?: string | null;
};
export type PatchedGroupChatPatchRead = {
  id?: string;
  title?: string;
  members?: string[];
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  is_private?: boolean;
};
export type PaginatedChatList = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Chat[];
};
export type PaginatedChatListRead = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ChatRead[];
};
export type Message = {
  text?: string | null;
  sender: User;
  files: MessageFile[];
  was_read_by: User[];
};
export type MessageRead = {
  id: string;
  text?: string | null;
  voice: string | null;
  sender: UserRead;
  chat: string;
  files: MessageFile[];
  updated_at: string | null;
  created_at: string;
  was_read_by: UserRead[];
};
export type PatchedMessage = {
  text?: string | null;
  sender?: User;
  files?: MessageFile[];
  was_read_by?: User[];
};
export type PatchedMessageRead = {
  id?: string;
  text?: string | null;
  voice?: string | null;
  sender?: UserRead;
  chat?: string;
  files?: MessageFile[];
  updated_at?: string | null;
  created_at?: string;
  was_read_by?: UserRead[];
};
export type PaginatedMessageList = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Message[];
};
export type PaginatedMessageListRead = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: MessageRead[];
};
export type MessageCreate = {
  text?: string | null;
  voice?: string | null;
  chat: string;
  files?: MessageFile[];
};
export type MessageCreateRead = {
  id: string;
  text?: string | null;
  voice?: string | null;
  chat: string;
  files?: MessageFile[];
  updated_at: string | null;
  created_at: string;
  was_read_by: string[];
};
export type UserCreate = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
};
export type UserCreateRead = {
  id: string;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
  is_online: boolean;
  last_online_at: string;
};
export type UserCreateWrite = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
};
export type PatchedUser = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username?: string;
  first_name?: string;
  last_name?: string;
  bio?: string | null;
  avatar?: string | null;
};
export type PatchedUserRead = {
  id?: string;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username?: string;
  first_name?: string;
  last_name?: string;
  bio?: string | null;
  avatar?: string | null;
  is_online?: boolean;
  last_online_at?: string;
};
export type PaginatedUserList = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: User[];
};
export type PaginatedUserListRead = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: UserRead[];
};
export const {
  useAuthCreateMutation,
  useAuthRefreshCreateMutation,
  useCentrifugoConnectCreateMutation,
  useCentrifugoSubscribeCreateMutation,
  useChatRetrieveQuery,
  useChatPartialUpdateMutation,
  useChatDestroyMutation,
  useChatLeaveCreateMutation,
  useChatsListQuery,
  useChatsCreateMutation,
  useMessageRetrieveQuery,
  useMessagePartialUpdateMutation,
  useMessageDestroyMutation,
  useMessageReadCreateMutation,
  useMessagesListQuery,
  useMessagesCreateMutation,
  useRegisterCreateMutation,
  useUserCurrentRetrieveQuery,
  useUserRetrieveQuery,
  useUserPartialUpdateMutation,
  useUserDestroyMutation,
  useUserOfflineCreateMutation,
  useUserOnlineCreateMutation,
  useUsersListQuery,
} = injectedRtkApi;
