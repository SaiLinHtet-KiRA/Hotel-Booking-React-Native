import Bookings from "@/interface/Bookings";
import type { BookingStatus } from "../../interface/Booking";
import type Response from "../../interface/Response";
import { apiSlice } from "./apiSlice";

export type BookingsPaginationQuery = {
  page?: number;
  limit?: number;
  status?: BookingStatus;
};

export const bookingColApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookingCol: builder.query<Response<Bookings>, void>({
      query: () => {
        return `/bookings-col?`;
      },
      providesTags: ["Booking"],
    }),
  }),
});

export const { useGetBookingColQuery } = bookingColApiSlice;
