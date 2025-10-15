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

export const createSuccessResponse = <T = void>(
    message: string,
    data?: T
): SuccessApiResponse<T> => ({
    status: 'success',
    message,
    data,
});

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

export const isSuccessResponse = <T>(
    response: ApiResponse<T>
): response is SuccessApiResponse<T> => {
    return response.status === 'success';
};

export const isErrorResponse = (response: ApiResponse): response is ErrorApiResponse => {
    return response.status === 'error';
};
