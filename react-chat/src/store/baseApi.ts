import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vkedu-fullstack-div2.ru' }),
  endpoints: () => ({}),
});
