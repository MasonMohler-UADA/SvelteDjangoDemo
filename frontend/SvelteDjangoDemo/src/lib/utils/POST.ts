export type EZPOSTRequest = {
    endpoint: URL,
    pathname: string,
    token?: string,
    body: string,
    includeRawResponse?: boolean
}


type EZPOSTResponse = {
    type: 'success',
    data: { [key: string]: any },
    rawResponse?: Response
} | {
    type: 'fail',
    errors?: { [key: string]: string[]; },
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
    error: Error
}


export async function POST(requestConfig: EZPOSTRequest): Promise<EZPOSTResponse> {
    const { endpoint, pathname, body, token, includeRawResponse } = requestConfig;

    const headers = new Headers()

    if (token)
        headers.set('Authorization', `Token ${token}`)

    headers.set('Content-type', 'application/json; charset=UTF-8')

    const options = {
        'method': 'POST',
        'headers': headers,
        'body': body
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
        .then(async (res) => {
            if (res.type === 'success') {
                return res
            }
            switch (res.status) {
                case 400:
                    const errorMessages: { [key: string]: string[]; } = await res.json();
                    return {
                        type: 'fail' as const,
                        code: 'invalid-fields' as const,
                        status: 400 as const,
                        errors: errorMessages,
                        ...(includeRawResponse && { rawResponse: res }),
                    }
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
        .catch((err) => {
            return {
                type: 'error' as const,
                code: 'unexpected',
                status: 404,
                message: 'Unexpected error occurred.',
                error: err
            }
        });
}