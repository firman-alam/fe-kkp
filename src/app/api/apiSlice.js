import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://backend-kkp.herokuapp.com/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQuery,
  tagTypes: ['Income', 'Outcome', 'User'],
  endpoints: (builder) => ({}),
});
