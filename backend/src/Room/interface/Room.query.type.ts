export type PaginationQuery = {
  page?: number;
  limit?: number;
  type?: "single bed" | "double bed" | "family" | "deluxe" | "suite";
  status?: "available" | "busy" | "maintenance";
};
