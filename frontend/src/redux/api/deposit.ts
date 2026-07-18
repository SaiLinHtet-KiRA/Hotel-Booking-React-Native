import type { AccountInfo } from "@/interface/User";
import { apiSlice } from "./apiSlice";
import type Receipt from "@/interface/Receipt";
import type { Query } from "@/interface/other";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation<AccountInfo, Receipt>({
      query: (receipt) => {
        const formData = new FormData();
        Object.keys(receipt).map((key) =>
          formData.append(key, receipt[key as keyof Receipt] as string | Blob),
        );

        return {
          url: "/deposit",
          method: "POST",
          body: formData,
        };
      },
    }),
    getReceipts: builder.query<any, Query>({
      query: ({ page, limit }) => `/receipts?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useDepositMutation, useGetReceiptsQuery } = authApiSlice;
