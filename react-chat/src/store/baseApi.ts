import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { AuthRefreshCreateApiResponse } from './api';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://vkedu-fullstack-div2.ru/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  const accessToken = localStorage.getItem('accessToken');

  if (
    !['/api/auth/', '/api/register/'].includes((args as FetchArgs).url) &&
    !accessToken
  ) {
    throw new Error('No accessToken token found. Logging out...');
  }

  let response = await baseQuery(args, store, extraOptions);

  if (
    response.meta?.response?.status !== 401 &&
    response.meta?.response?.status !== 403
  ) {
    return response;
  }

  const refresh = localStorage.getItem('refreshToken') ?? '';

  let data;
  let refreshResult: AuthRefreshCreateApiResponse;

  try {
    data = await baseQuery(
      {
        url: '/api/auth/refresh/',
        method: 'POST',
        body: { refresh },
      },
      store,
      extraOptions,
    );

    refreshResult = data.data as AuthRefreshCreateApiResponse;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }

  localStorage.setItem('accessToken', refreshResult?.access ?? '');
  localStorage.setItem('refreshToken', refreshResult?.refresh ?? '');

  response = await baseQuery(args, store, extraOptions);

  return response;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
