export class ErrorResponse extends Error {
    readonly response: TErrorResponse;

    constructor(response: TErrorResponse) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        super(response.error, { cause: response.cause });
        this.response = response;
        Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}

export type TErrorResponse = {
    timestamp: string;
    status: number;
    error: string;
    path?: string;
    cause?: string;
    advice?: string | null;
    details?: TMessageEntity[] | null;
    warnings?: TMessageEntity[] | null;
};

export type TMessageEntity = {
    message: string;
    object?: string;
    objectId?: number;
    field?: string;
};

export const getErrorResponse = async (
    error: Response
): Promise<TErrorResponse> => {
    const contentLength = error.headers.get('content-length');
    const contentType = error.headers.get('content-type');
    if (contentLength !== '0' && contentType !== null) {
        if (contentType.indexOf('application/json') !== -1) {
            return await error.json();
        }
        const resultErrorTest: string = await error.text();
        return {
            error: resultErrorTest,
            status: error.status,
            timestamp: new Date().toUTCString(),
        };
    }
    return {
        error: error.statusText,
        status: error.status,
        timestamp: new Date().toUTCString(),
    };
};