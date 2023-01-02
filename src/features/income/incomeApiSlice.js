import { apiSlice } from '../../app/api/apiSlice';

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: () => '/income',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
    }),
  }),
});
