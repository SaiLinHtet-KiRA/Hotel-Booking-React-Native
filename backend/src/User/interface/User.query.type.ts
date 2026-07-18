export type PaginationQuery = {
  page?: number;
  limit?: number;
  name?: string;
  role?: "admin" | "owner" | "user";
};
