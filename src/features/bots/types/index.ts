export type ApiResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; issues?: string[] };

export type PaginatedResponse<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "asc" | "desc";
};
