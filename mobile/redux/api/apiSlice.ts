import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

const baseUrl = Platform.select({
  android: "http://10.0.2.2:4000",
  ios: "http://localhost:4000",
  default: "http://172.20.10.2:4000",
});

const baseQuery = fetchBaseQuery({
  baseUrl: "http://172.20.10.2:4000",
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Room", "User", "Auth", "Booking"],
  endpoints: () => ({}),
});
