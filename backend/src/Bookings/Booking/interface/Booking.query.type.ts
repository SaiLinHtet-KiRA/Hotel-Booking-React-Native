export type PaginationQuery = {
  page?: number;
  limit?: number;
  status?: "pending" | "confirmed" | "cancelled";
};
