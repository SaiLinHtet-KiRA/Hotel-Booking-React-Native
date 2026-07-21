import type { RoomDTO } from "../../interface/Room";
import type Room from "../../interface/Room";
import type Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";

export type RoomPaginationQuery = {
  page?: number;
  limit?: number;
};

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<Response<Room[]>, RoomPaginationQuery>({
      query: ({ page, limit }) => `/room?page=${page}&limit=${limit}`,
      providesTags: ["Room"],
    }),
    getRoom: builder.query<Response<Room>, string>({
      query: (id) => ({ url: `/room/${id}`, method: "GET" }),
      providesTags: ["Room"],
    }),
    deleteRoom: builder.mutation<Response<Room>, string>({
      query: (id) => ({ url: `/room/${id}`, method: "DELETE" }),
      invalidatesTags: ["Room"],
    }),
    updateRoom: builder.mutation<
      Response<Room>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/room/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Room"],
    }),
    createRoom: builder.mutation<Response<Room>, FormData>({
      query: (body) => ({ url: "/room", method: "POST", body }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useDeleteRoomMutation,
  useCreateRoomMutation,
  useUpdateRoomMutation,
} = roomApiSlice;
