import { apiSlice } from "./apiSlice";
import type LoginDTO from "../../interface/Login";
import type User from "../../interface/User";
import type Response from "../../interface/Response";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Response<User>, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),
    Login: builder.mutation<Response<User>, Partial<LoginDTO>>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    Logout: builder.mutation<Response<undefined>, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useGetProfileQuery, useLoginMutation, useLogoutMutation } =
  authApiSlice;
