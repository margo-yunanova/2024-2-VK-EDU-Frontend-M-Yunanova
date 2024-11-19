import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { AuthRefreshCreateApiResponse } from './api';

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
    );

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, store, extraOptions) => {
  let response = await baseQuery(args, store, extraOptions);

  if (
    response.meta?.response?.status !== 401 &&
    response.meta?.response?.status !== 403
  ) {
    return response;
  }

  const refresh = localStorage.getItem('refreshToken');

  if (!refresh) {
    console.warn('No refresh token found. Logging out...');
  }

  const data = await baseQuery(
    {
      url: '/api/auth/refresh/',
      method: 'POST',
      body: { refresh },
    },
    store,
    extraOptions,
  );

  const refreshResult = data.data as AuthRefreshCreateApiResponse;

  if (!refreshResult) {
    console.error('Failed to refresh token:');
  }

  localStorage.setItem('accessToken', refreshResult.access ?? '');
  localStorage.setItem('refreshToken', refreshResult.refresh);

  response = await baseQuery(args, store, extraOptions);

  return response;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
