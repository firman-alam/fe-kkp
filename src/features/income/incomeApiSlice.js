import { apiSlice } from '../../app/api/apiSlice';

export const incomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncome: builder.query({
      query: () => '/income',
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Income', id: 'IN' },
            ...result.ids.map((id) => ({ type: 'Income', id })),
          ];
        } else return [{ type: 'Income', id: 'IN' }];
      },
    }),
    getTotalIncome: builder.query({
      query: () => '/income/total',
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Income', id: 'IN' },
            ...result.ids.map((id) => ({ type: 'Income', id })),
          ];
        } else return [{ type: 'Income', id: 'IN' }];
      },
    }),
    addNewIncome: builder.mutation({
      query: (data) => ({
        url: '/income',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Income' }],
    }),
    updateIncome: builder.mutation({
      query: (data) => ({
        url: '/income',
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Income' }],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/income/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'Income' }],
    }),
  }),
});

export const {
  useGetIncomeQuery,
  useAddNewIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useGetTotalIncomeQuery,
} = incomeApiSlice;
