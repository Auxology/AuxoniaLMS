/**
 * Standardized API response types for consistent error handling across features
 */

export type ApiResponseStatus = 'success' | 'error';

export type BaseApiResponse = {
    status: ApiResponseStatus;
    message: string;
};

export type SuccessApiResponse<T = void> = BaseApiResponse & {
    status: 'success';
    data?: T;
};

export type ErrorApiResponse = BaseApiResponse & {
    status: 'error';
    code?: string;
    details?: Record<string, unknown>;
};

export type ApiResponse<T = void> = SuccessApiResponse<T> | ErrorApiResponse;

/**
 * Helper function to create a success response
 */
export const createSuccessResponse = <T = void>(
    message: string,
    data?: T
): SuccessApiResponse<T> => ({
    status: 'success',
    message,
    data,
});

/**
 * Helper function to create an error response
 */
export const createErrorResponse = (
    message: string,
    code?: string,
    details?: Record<string, unknown>
): ErrorApiResponse => ({
    status: 'error',
    message,
    code,
    details,
});

/**
 * Type guard to check if response is successful
 */
export const isSuccessResponse = <T>(
    response: ApiResponse<T>
): response is SuccessApiResponse<T> => {
    return response.status === 'success';
};

/**
 * Type guard to check if response is an error
 */
export const isErrorResponse = (response: ApiResponse): response is ErrorApiResponse => {
    return response.status === 'error';
};
