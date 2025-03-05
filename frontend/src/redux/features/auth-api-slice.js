import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = "http://localhost:8080";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //Register New User
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    //Login User
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
