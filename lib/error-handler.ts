export class FormValidationError extends Error {
  constructor(
    message: string,
    public errors: Array<{ field: string; message: string }>,
  ) {
    super(message)
    this.name = "FormValidationError"
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AuthenticationError"
  }
}

export const handleError = (error: unknown): { message: string; code?: string } => {
  if (error instanceof FormValidationError) {
    return {
      message: error.message,
      code: "VALIDATION_ERROR",
    }
  }

  if (error instanceof APIError) {
    return {
      message: error.message,
      code: error.code,
    }
  }

  if (error instanceof AuthenticationError) {
    return {
      message: error.message,
      code: "AUTH_ERROR",
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "UNKNOWN_ERROR",
    }
  }

  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
  }
}

export const getErrorMessage = (code?: string): string => {
  const messages: Record<string, string> = {
    VALIDATION_ERROR: "Please check your input and try again",
    AUTH_ERROR: "Authentication failed. Please try logging in again",
    NETWORK_ERROR: "Network error. Please check your connection and try again",
    SERVER_ERROR: "Server error. Please try again later",
    UNKNOWN_ERROR: "An unexpected error occurred",
  }

  return messages[code || "UNKNOWN_ERROR"] || "An error occurred"
}
