import type Booking from "../../interface/Booking";
import type { BookingDTO, BookingStatus } from "../../interface/Booking";
import type Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";

export type BookingsPaginationQuery = {
  page?: number;
  limit?: number;
  status?: BookingStatus;
};

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<Response<Booking[]>, BookingsPaginationQuery>({
      query: ({ page, limit, status }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.set("page", String(page));
        if (limit !== undefined) params.set("limit", String(limit));
        if (status) params.set("status", status);
        return `/bookings?${params.toString()}`;
      },
      providesTags: ["Booking"],
    }),
    getBooking: builder.query<Response<Booking>, string>({
      query: (id) => ({ url: `/booking/${id}`, method: "GET" }),
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation<Response<Booking>, BookingDTO>({
      query: (body) => ({ url: "/booking", method: "POST", body }),
      invalidatesTags: ["Booking", "Room"],
    }),
    updateBooking: builder.mutation<
      Response<Booking>,
      { id: string; body: BookingDTO }
    >({
      query: ({ id, body }) => ({
        url: `/booking/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Booking", "Room"],
    }),
    deleteBooking: builder.mutation<Response<Booking>, string>({
      query: (id) => ({ url: `/booking/${id}`, method: "DELETE" }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useLazyGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApiSlice;
