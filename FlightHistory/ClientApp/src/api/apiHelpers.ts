import {accessToken, accessTokenAppearsValid} from "../helpers/tokenHelper";
import {stubFetch} from "./stub/stubApiResponse";
import {Api} from "./apiClient";

export async function get<T>(url: string): Promise<T> {
    return await makeAuthenticatedRequest<T>(url, {
        method: 'GET',
        headers: getHeaders()
    });
}

export async function post<T>(url: string, data?: unknown) {
    return await makeAuthenticatedRequest<T>(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
}

export async function anonymousPost<T>(url: string, data?: unknown) {
    return await makeRequest<T>(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

function getHeaders(): Record<string, string> {
    return {
        'Authorization': `Bearer ${accessToken.get()}`,
        'Content-Type': 'application/json',
    }
}

async function makeAuthenticatedRequest<T>(url: string, options: RequestInit): Promise<T> {
    if (!accessTokenAppearsValid()) {
        await Api.auth.refreshToken();
    }
    
    try {
        return await makeRequest(url, options);
    } catch (exception) {
        if (exception.status === 401) {
            await Api.auth.refreshToken();
            return await makeRequest(url, options); 
        }
        
        throw exception;
    }
}

async function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
    const response = USE_SAMPLE_DATA ? await stubFetch(url, options) : await fetch(url, options);

    let responseJson;
    try {
        responseJson = await response.json();
    } catch (e) {
        responseJson = {};
    }

    if (response.ok) {
        return responseJson;
    }

    throw new ApiError(responseJson, response.status);
}

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}
