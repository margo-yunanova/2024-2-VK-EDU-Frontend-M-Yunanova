import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { AuthRefreshCreateApiResponse } from './api';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
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
    response.error &&
    response.error.status !== 401 &&
    response.error.status !== 403
  ) {
    return response;
  }

  const tokenRefresh = localStorage.getItem('refreshToken');

  if (!tokenRefresh) {
    console.warn('No refresh token found. Logging out...');
  }

  const { data, error } = await baseQuery(
    {
      url: '/auth/refresh/',
      method: 'POST',
      body: { tokenRefresh },
    },
    store,
    extraOptions,
  );

  const refreshResult = data as AuthRefreshCreateApiResponse;

  if (!refreshResult) {
    console.error('Failed to refresh token:', error);
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
