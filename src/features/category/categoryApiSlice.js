import { apiSlice } from '../../app/api/apiSlice';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (category) => `/category/${category}`,
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Income', id: 'IN' },
            ...result.ids.map((id) => ({ type: 'Income', id })),
          ];
        } else return [{ type: 'Income', id: 'IN' }];
      },
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApiSlice;
