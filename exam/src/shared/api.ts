import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TranslateResponse = {
  responseData: {
    translatedText: string;
    detectedLanguage: string;
  };
  matches: [
    {
      id: number;
      translation: string;
      source: string;
      target: string;
    },
  ];
};

type TranslateRequest = {
  text: string;
  from: string;
  to: string;
};

export const getTranslate = createApi({
  reducerPath: 'getTranslate',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.mymemory.translated.net/get',
  }),
  endpoints: (build) => ({
    translate: build.query<TranslateResponse, TranslateRequest>({
      query: ({ text, from, to }) => ({
        url: '',
        params: {
          q: text,
          langpair: `${from}|${to}`,
        },
      }),
    }),
  }),
});

export const { useTranslateQuery } = getTranslate;
