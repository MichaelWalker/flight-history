import {accessToken} from "../helpers/tokenHelper";
import {stubFetch} from "./stub/stubApiResponse";

export async function get<T>(url: string): Promise<T> {
    return await makeRequest<T>(url, {
        method: 'GET',
        headers: getHeaders()
    });
}

export async function post<T>(url: string, data?: unknown) {
    return await makeRequest<T>(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
}

function getHeaders(): Headers {
    const headers: Headers = new Headers();
    const token = accessToken.get();

    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type','application/json');

    return headers;
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