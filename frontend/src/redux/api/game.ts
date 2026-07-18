import { apiSlice } from "./apiSlice";
import type { Query } from "@/interface/other";
import type Game from "@/interface/Game";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<Game[], Query>({
      query: ({ page, limit }) => `/game?page=${page}&limit=${limit}`,
    }),
    getGame: builder.query<Game, string>({
      query: (id) => `/game/${id}`,
    }),
    updateGame: builder.mutation<Game, { id: string; body: Game }>({
      query: ({ id, body }) => ({ url: `/game/${id}`, method: "PATCH", body }),
    }),
  }),
});

export const { useGetGamesQuery, useGetGameQuery, useUpdateGameMutation } =
  authApiSlice;
