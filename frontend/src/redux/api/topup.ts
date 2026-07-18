import type { Query } from "@/interface/other";
import { apiSlice } from "./apiSlice";
import type { Package } from "@/interface/package";

interface Body {
  game: string;
  package: string;
  checkId: {
    userID: string;
    zoneID: string;
    server?: string;
  };
  login: {
    username: string;
    password: string;
    backupCode: string;
  };
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTopup: builder.mutation<Package[], Body>({
      query: (data) => ({
        url: "/topup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AccountInfo", "Histroy"],
    }),
    getTopups: builder.query<any, Query>({
      query: ({ page, limit }) => `/topups?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useCreateTopupMutation, useGetTopupsQuery } = authApiSlice;
