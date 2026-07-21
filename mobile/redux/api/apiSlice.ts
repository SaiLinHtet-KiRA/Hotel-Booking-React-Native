import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../util/token";
import { BACKEND_URL } from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: async (headers) => {
    const token = await getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Room", "User", "Auth", "Booking"],
  endpoints: () => ({}),
});
