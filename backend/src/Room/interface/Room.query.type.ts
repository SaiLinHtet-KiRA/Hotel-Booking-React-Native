export type PaginationQuery = {
  page?: number;
  limit?: number;
  time?: number;
  sort?: "startTime" | "createdAt";
};
