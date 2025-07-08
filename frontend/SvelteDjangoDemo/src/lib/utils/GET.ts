export type EZGETRequest = {
    endpoint: URL,
    pathname: string,
    token?: string,
    exportType?: 'csv',
    includeRawResponse?: boolean
}

type EZGETResponse = {
    type: 'success',
    data: { [key: string]: any },
    rawResponse?: Response
} | {
    type: 'redirect',
    code: 'invalid-token',
    status: 307,
    location: string,
    rawResponse?: Response
} | {
    type: 'error',
    code: 'not-authorized' | 'not-found' | 'method-not-allowed',
    status: 403 | 404 | 405,
    message: string,
    rawResponse?: Response
} | {
    type: 'error',
    code: 'unexpected',
    status: 404,
    message: string,
    error?: Error
}


export async function GET(requestConfig: EZGETRequest): Promise<EZGETResponse> {
    const { endpoint, pathname, token, exportType, includeRawResponse } = requestConfig;

    const headers = new Headers()

    if (token)
        headers.set('Authorization', `Token ${token}`)

    if (exportType === 'csv') {
        headers.set('Accept', 'text/csv')
    }

    const options = {
        'method': 'GET',
        'headers': headers
    };

    const req = new Request(endpoint, options)

    return await fetch(req)
        .then(async (res) => {
            if (res.ok) {
                if (res.headers.get('content-type')?.includes('application/json')) {
                    const resJSON = await res.json()
                    return {
                        type: 'success' as const,
                        data: resJSON,
                        ...(includeRawResponse && { rawResponse: res }),
                    }
                }
                const resText = await res.text()
                return {
                    type: 'success' as const,
                    data: resText,
                    ...(includeRawResponse && { rawResponse: res }),
                }
            }
            return res;
        })
        .then((res) => {
            if (res.type === 'success') {
                return res
            }
            switch (res.status) {
                case 401:
                    return {
                        type: 'redirect' as const,
                        code: 'invalid-token' as const,
                        status: 307 as const,
                        location: `/accounts/login?next=${pathname}`,
                        ...(includeRawResponse && { rawResponse: res }),
                    }
                case 403:
                    return {
                        type: 'error' as const,
                        code: 'not-authorized' as const,
                        status: 403 as const,
                        message: 'Not authorized to access this resource.',
                        ...(includeRawResponse && { rawResponse: res }),
                    }
                case 405:
                    return {
                        type: 'error' as const,
                        code: 'method-not-allowed' as const,
                        status: 405 as const,
                        message: 'Method not allowed.',
                        ...(includeRawResponse && { rawResponse: res }),
                    }
                default:
                    return {
                        type: 'error' as const,
                        code: 'not-found' as const,
                        status: 404 as const,
                        message: 'Unable to retrieve requested resource.',
                        ...(includeRawResponse && { rawResponse: res }),
                    }
            }
        })
        .catch((err: Error) => {
            return {
                type: 'error' as const,
                code: 'unexpected',
                status: 404,
                message: 'Unexpected error occurred.',
                error: err
            }
        })
}