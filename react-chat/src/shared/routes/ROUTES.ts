export const ROUTES = {
  ROOT: '/',
  CHATS: 'chats',
  CHAT: (id: string) => `chats/${id}`,
  PROFILE: 'profile',
  LOGIN: 'login',
  REGISTER: 'register',
  CREATE_PRIVATE_CHAT: 'create-private-chat',
  CREATE_GROUP_CHAT: 'create-group-chat',
} as const;
