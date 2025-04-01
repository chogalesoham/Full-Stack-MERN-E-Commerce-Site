import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const apiUrl = "http://localhost:8080";
const apiUrl = "https://full-stack-mern-e-commerce-site.onrender.com";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/review`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/write-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),

    getReviewsCount: builder.query({
      query: () => ({
        url: "/total-reviews",
      }),
      providesTags: ["Reviews"],
    }),

    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result, error, userId) =>
        result ? [{ type: "Reviews", id: userId }] : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewApi;

export default reviewApi;
