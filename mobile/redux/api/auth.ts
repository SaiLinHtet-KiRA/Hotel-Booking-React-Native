import { apiSlice } from "./apiSlice";
import type LoginDTO from "../../interface/Login";
import type User from "../../interface/User";
import type Response from "../../interface/Response";

type LoginResponse = Response<User> & { token: string };

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Response<User>, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),
    Login: builder.mutation<LoginResponse, Partial<LoginDTO>>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    Signup: builder.mutation<Response<undefined>, { name: string; email: string; password: string }>({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
    }),
    Logout: builder.mutation<Response<undefined>, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useGetProfileQuery, useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApiSlice;
