import { ErrorResponse, getErrorResponse } from './utils.ts';

export class RequestService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static get<T>(url: string, options?: any): Promise<T> {
        return this.request<T>('get')(url, options);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static post<T>(url: string, data?: any, options?: any): Promise<T> {
        return this.request<T>('post')(url, { ...options, body: data });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static put<T>(url: string, data?: any, options?: any): Promise<T> {
        return this.request<T>('put')(url, { ...options, body: data });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static delete<T>(url: string, options?: any): Promise<T> {
        return this.request<T>('delete')(url, options);
    }

    private static request<T>(method: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (url: string, options: any) => this.fetch<T>(method, url, options);
    }

    private static async fetch<T>(httpMethod: string, url: string,
         options?: {
             headers?: {
                 [header: string]: string;
             };
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             body?: any;
             responseType? :string;
         }
    ): Promise<T> {
        let headers: { [header: string]: string } = {
            ...options?.headers
        };
        let body = options?.body;

        if (!(body instanceof FormData)) {
            headers = {
                ...headers,
                'Content-Type': 'application/json'
            };
            if (body) {
                body = JSON.stringify(body);
            }
        }

        try {
            const init: {
                method: string;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                headers: any;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                body?: any;
            } = {
                method: httpMethod,
                headers: headers,
            };

            if (init.method != 'GET') {
                init.body = body;
            }

            const response = await fetch(url, init);

            if (!response.ok) {
                const errorResponse = await getErrorResponse(response);
                throw new ErrorResponse(errorResponse);
            }

            let dataResponse: T;

            if (options?.responseType?.toLowerCase() === 'blob') {
                dataResponse = await response.blob() as T;
            } else {
                dataResponse = await response.json();
            }

            return Promise.resolve(dataResponse);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}