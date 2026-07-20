export type PaginationQuery = {
  page?: number;
  limit?: number;
  email?: string;
  role?: "admin" | "user";
};
