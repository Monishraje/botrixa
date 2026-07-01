export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ValidationErrorResponse extends ApiError {
  error: {
    code: "VALIDATION_ERROR";
    message: string;
    details: Record<string, string[]>;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ApiError;
