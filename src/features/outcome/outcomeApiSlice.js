import { apiSlice } from '../../app/api/apiSlice';

export const outcomeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOutcome: builder.query({
      query: () => '/outcome',
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Outcome', id: 'OUT' },
            ...result.ids.map((id) => ({ type: 'Outcome', id })),
          ];
        } else return [{ type: 'Outcome', id: 'OUT' }];
      },
    }),
    getTotalOutcome: builder.query({
      query: () => '/outcome/total',
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Outcome', id: 'OUT' },
            ...result.ids.map((id) => ({ type: 'Outcome', id })),
          ];
        } else return [{ type: 'Outcome', id: 'OUT' }];
      },
    }),
    addNewOutcome: builder.mutation({
      query: (data) => ({
        url: '/outcome',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Outcome' }],
    }),
    updateOutcome: builder.mutation({
      query: (data) => ({
        url: '/outcome',
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Outcome' }],
    }),
    deleteOutcome: builder.mutation({
      query: (id) => ({
        url: `/outcome/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: [{ type: 'Outcome' }],
    }),
  }),
});

export const {
  useGetOutcomeQuery,
  useAddNewOutcomeMutation,
  useUpdateOutcomeMutation,
  useDeleteOutcomeMutation,
  useGetTotalOutcomeQuery,
} = outcomeApiSlice;
