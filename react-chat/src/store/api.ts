import { api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authCreate: build.mutation<AuthCreateApiResponse, AuthCreateApiArg>({
      query: (queryArg) => ({
        url: `/auth/`,
        method: 'POST',
        body: queryArg.tokenObtainPair,
      }),
    }),
    authRefreshCreate: build.mutation<
      AuthRefreshCreateApiResponse,
      AuthRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/refresh/`,
        method: 'POST',
        body: queryArg.tokenRefresh,
      }),
    }),
    centrifugoConnectCreate: build.mutation<
      CentrifugoConnectCreateApiResponse,
      CentrifugoConnectCreateApiArg
    >({
      query: () => ({ url: `/centrifugo/connect/`, method: 'POST' }),
    }),
    centrifugoSubscribeCreate: build.mutation<
      CentrifugoSubscribeCreateApiResponse,
      CentrifugoSubscribeCreateApiArg
    >({
      query: () => ({ url: `/centrifugo/subscribe/`, method: 'POST' }),
    }),
    chatRead: build.query<ChatReadApiResponse, ChatReadApiArg>({
      query: (queryArg) => ({ url: `/chat/${queryArg.id}/` }),
    }),
    chatUpdate: build.mutation<ChatUpdateApiResponse, ChatUpdateApiArg>({
      query: (queryArg) => ({
        url: `/chat/${queryArg.id}/`,
        method: 'PUT',
        body: queryArg.groupChatPatch,
      }),
    }),
    chatPartialUpdate: build.mutation<
      ChatPartialUpdateApiResponse,
      ChatPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/chat/${queryArg.id}/`,
        method: 'PATCH',
        body: queryArg.groupChatPatch,
      }),
    }),
    chatDelete: build.mutation<ChatDeleteApiResponse, ChatDeleteApiArg>({
      query: (queryArg) => ({ url: `/chat/${queryArg.id}/`, method: 'DELETE' }),
    }),
    chatsList: build.query<ChatsListApiResponse, ChatsListApiArg>({
      query: (queryArg) => ({
        url: `/chats/`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          page_size: queryArg.pageSize,
        },
      }),
    }),
    chatsCreate: build.mutation<ChatsCreateApiResponse, ChatsCreateApiArg>({
      query: (queryArg) => ({
        url: `/chats/`,
        method: 'POST',
        body: queryArg.chat,
      }),
    }),
    messageRead: build.query<MessageReadApiResponse, MessageReadApiArg>({
      query: (queryArg) => ({ url: `/message/${queryArg.id}/` }),
    }),
    messageUpdate: build.mutation<
      MessageUpdateApiResponse,
      MessageUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/message/${queryArg.id}/`,
        method: 'PUT',
        body: queryArg.message,
      }),
    }),
    messagePartialUpdate: build.mutation<
      MessagePartialUpdateApiResponse,
      MessagePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/message/${queryArg.id}/`,
        method: 'PATCH',
        body: queryArg.message,
      }),
    }),
    messageDelete: build.mutation<
      MessageDeleteApiResponse,
      MessageDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/message/${queryArg.id}/`,
        method: 'DELETE',
      }),
    }),
    messagesList: build.query<MessagesListApiResponse, MessagesListApiArg>({
      query: (queryArg) => ({
        url: `/messages/`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          page_size: queryArg.pageSize,
        },
      }),
    }),
    messagesCreate: build.mutation<
      MessagesCreateApiResponse,
      MessagesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/messages/`,
        method: 'POST',
        body: queryArg.messageCreate,
      }),
    }),
    registerCreate: build.mutation<
      RegisterCreateApiResponse,
      RegisterCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/register/`,
        method: 'POST',
        body: queryArg.userCreate,
      }),
    }),
    userRead: build.query<UserReadApiResponse, UserReadApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}/` }),
    }),
    userUpdate: build.mutation<UserUpdateApiResponse, UserUpdateApiArg>({
      query: (queryArg) => ({
        url: `/user/${queryArg.id}/`,
        method: 'PUT',
        body: queryArg.user,
      }),
    }),
    userPartialUpdate: build.mutation<
      UserPartialUpdateApiResponse,
      UserPartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/${queryArg.id}/`,
        method: 'PATCH',
        body: queryArg.user,
      }),
    }),
    userDelete: build.mutation<UserDeleteApiResponse, UserDeleteApiArg>({
      query: (queryArg) => ({ url: `/user/${queryArg.id}/`, method: 'DELETE' }),
    }),
    usersList: build.query<UsersListApiResponse, UsersListApiArg>({
      query: (queryArg) => ({
        url: `/users/`,
        params: {
          search: queryArg.search,
          page: queryArg.page,
          page_size: queryArg.pageSize,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type AuthCreateApiResponse = /** status 201  */ TokenObtainPair;
export type AuthCreateApiArg = {
  tokenObtainPair: TokenObtainPair;
};
export type AuthRefreshCreateApiResponse = /** status 201  */ TokenRefreshRead;
export type AuthRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh;
};
export type CentrifugoConnectCreateApiResponse = unknown;
export type CentrifugoConnectCreateApiArg = void;
export type CentrifugoSubscribeCreateApiResponse = unknown;
export type CentrifugoSubscribeCreateApiArg = void;
export type ChatReadApiResponse = /** status 200  */ ChatRead;
export type ChatReadApiArg = {
  /** A UUID string identifying this chat. */
  id: string;
};
export type ChatUpdateApiResponse = /** status 200  */ GroupChatPatchRead;
export type ChatUpdateApiArg = {
  /** A UUID string identifying this chat. */
  id: string;
  groupChatPatch: GroupChatPatch;
};
export type ChatPartialUpdateApiResponse =
  /** status 200  */ GroupChatPatchRead;
export type ChatPartialUpdateApiArg = {
  /** A UUID string identifying this chat. */
  id: string;
  groupChatPatch: GroupChatPatch;
};
export type ChatDeleteApiResponse = unknown;
export type ChatDeleteApiArg = {
  /** A UUID string identifying this chat. */
  id: string;
};
export type ChatsListApiResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ChatRead[];
};
export type ChatsListApiArg = {
  /** A search term. */
  search?: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
};
export type ChatsCreateApiResponse = /** status 201  */ ChatRead;
export type ChatsCreateApiArg = {
  chat: Chat;
};
export type MessageReadApiResponse = /** status 200  */ MessageRead;
export type MessageReadApiArg = {
  /** A UUID string identifying this message. */
  id: string;
};
export type MessageUpdateApiResponse = /** status 200  */ MessageRead;
export type MessageUpdateApiArg = {
  /** A UUID string identifying this message. */
  id: string;
  message: Message;
};
export type MessagePartialUpdateApiResponse = /** status 200  */ MessageRead;
export type MessagePartialUpdateApiArg = {
  /** A UUID string identifying this message. */
  id: string;
  message: Message;
};
export type MessageDeleteApiResponse = unknown;
export type MessageDeleteApiArg = {
  /** A UUID string identifying this message. */
  id: string;
};
export type MessagesListApiResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: MessageRead[];
};
export type MessagesListApiArg = {
  /** A search term. */
  search?: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
};
export type MessagesCreateApiResponse = /** status 201  */ MessageCreateRead;
export type MessagesCreateApiArg = {
  messageCreate: MessageCreate;
};
export type RegisterCreateApiResponse = /** status 201  */ UserCreateRead;
export type RegisterCreateApiArg = {
  userCreate: UserCreate;
};
export type UserReadApiResponse = /** status 200  */ UserRead;
export type UserReadApiArg = {
  /** A UUID string identifying this user. */
  id: string;
};
export type UserUpdateApiResponse = /** status 200  */ UserRead;
export type UserUpdateApiArg = {
  /** A UUID string identifying this user. */
  id: string;
  user: User;
};
export type UserPartialUpdateApiResponse = /** status 200  */ UserRead;
export type UserPartialUpdateApiArg = {
  /** A UUID string identifying this user. */
  id: string;
  user: User;
};
export type UserDeleteApiResponse = unknown;
export type UserDeleteApiArg = {
  /** A UUID string identifying this user. */
  id: string;
};
export type UsersListApiResponse = /** status 200  */ {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: UserRead[];
};
export type UsersListApiArg = {
  /** A search term. */
  search?: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  pageSize?: number;
};
export type TokenObtainPair = {
  username: string;
  password: string;
};
export type TokenRefresh = {
  refresh: string;
};
export type TokenRefreshRead = {
  refresh: string;
  access?: string;
};
export type User = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
};
export type UserRead = {
  id?: string;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
};
export type Chat = {
  members: User[];
  creator: User;
  is_private: boolean;
};
export type ChatRead = {
  id?: string;
  title?: string;
  members: UserRead[];
  creator: UserRead;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  is_private: boolean;
  last_message?: string;
};
export type GroupChatPatch = {
  title: string;
  members: string[];
};
export type GroupChatPatchRead = {
  id?: string;
  title: string;
  members: string[];
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  is_private?: boolean;
};
export type MessageFile = {};
export type MessageFileRead = {
  item?: string | null;
};
export type Message = {
  text?: string | null;
  sender: User;
  files: MessageFile[];
};
export type MessageRead = {
  id?: string;
  text?: string | null;
  voice?: string | null;
  sender: UserRead;
  chat?: string;
  files: MessageFileRead[];
  updated_at?: string | null;
  created_at?: string;
};
export type MessageCreate = {
  text?: string | null;
  chat: string;
  files?: MessageFile[];
};
export type MessageCreateRead = {
  id?: string;
  text?: string | null;
  voice?: string | null;
  chat: string;
  files?: MessageFileRead[];
  updated_at?: string | null;
  created_at?: string;
};
export type UserCreate = {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
};
export type UserCreateRead = {
  id?: string;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar?: string | null;
};
export const {
  useAuthCreateMutation,
  useAuthRefreshCreateMutation,
  useCentrifugoConnectCreateMutation,
  useCentrifugoSubscribeCreateMutation,
  useChatReadQuery,
  useChatUpdateMutation,
  useChatPartialUpdateMutation,
  useChatDeleteMutation,
  useChatsListQuery,
  useChatsCreateMutation,
  useMessageReadQuery,
  useMessageUpdateMutation,
  useMessagePartialUpdateMutation,
  useMessageDeleteMutation,
  useMessagesListQuery,
  useMessagesCreateMutation,
  useRegisterCreateMutation,
  useUserReadQuery,
  useUserUpdateMutation,
  useUserPartialUpdateMutation,
  useUserDeleteMutation,
  useUsersListQuery,
} = injectedRtkApi;
