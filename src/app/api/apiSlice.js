import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  // baseUrl: 'https://backend-kkp.herokuapp.com/api/v1',
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
