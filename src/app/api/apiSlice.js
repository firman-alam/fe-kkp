import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  tagTypes: ['Income', 'Outcome', 'TotalIncome', 'TotalOutcome', 'User'],
  endpoints: (builder) => ({}),
});
