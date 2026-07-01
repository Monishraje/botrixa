export class AppError extends Error {
  public readonly code: string;
  public readonly details?: unknown;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "UNAUTHENTICATED", 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Permission denied") {
    super(message, "UNAUTHORIZED", 403);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Database operation failed", details?: unknown) {
    super(message, "DATABASE_ERROR", 500, details);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = "External service failed", details?: unknown) {
    super(message, "EXTERNAL_SERVICE_ERROR", 502, details);
  }
}

export class AIError extends AppError {
  constructor(message: string = "AI processing failed", details?: unknown) {
    super(message, "AI_ERROR", 500, details);
  }
}
