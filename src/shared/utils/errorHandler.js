/**
 * Error handler utilities
 */

export class AppError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
  }
}

export const ErrorCodes = {
  NO_SKU_ID: 'NO_SKU_ID',
  API_ERROR: 'API_ERROR',
  VIEWER_INIT_ERROR: 'VIEWER_INIT_ERROR',
  MODEL_LOAD_ERROR: 'MODEL_LOAD_ERROR',
  INVALID_PARAMS: 'INVALID_PARAMS',
};

export const handleError = (error, context = '') => {
  console.error(`[Error${context ? ` - ${context}` : ''}]`, error);

  if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
    console.error('Error stack:', error.stack);
  }

  // Send to error tracking service (e.g., Sentry)
  if (import.meta.env.VITE_SENTRY_DSN) {
    // Sentry.captureException(error);
  }

  return error;
};

export const createErrorMessage = (error) => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

