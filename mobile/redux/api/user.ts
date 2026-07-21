import type { UserDTO } from "../../interface/User";
import type User from "../../interface/User";
import type Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";

export type PaginationQuery = {
  page?: number;
  limit?: number;
  name?: string;
  role?: "admin" | "user";
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<Response<User[]>, PaginationQuery>({
      query: ({ page, limit, role, name }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.set("page", String(page));
        if (limit !== undefined) params.set("limit", String(limit));
        if (role) params.set("role", role);
        if (name) params.set("name", name);
        return `/user?${params.toString()}`;
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<Response<User>, { id: string; body: UserDTO }>(
      {
        query: ({ id, body }) => ({
          url: `/user/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["User"],
      },
    ),
    deleteUser: builder.mutation<Response<User>, string>({
      query: (id) => ({ url: `/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
    createUser: builder.mutation<Response<User>, UserDTO>({
      query: (body) => ({ url: "/user", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = authApiSlice;
