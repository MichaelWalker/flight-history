import {ApiError} from "./apiError";
import {accessToken} from "../helpers/tokenHelper";
import {TokenModel} from "../models/tokenModel";

export async function signIn(): Promise<TokenModel> {
    return await post<TokenModel>("/api/auth/sign-in");
}

export async function refreshToken(): Promise<TokenModel> {
    return await post<TokenModel>("/api/auth/refresh");
}

export async function signOut(): Promise<void> {
    return await post<void>("/api/auth/sign-out");
}

async function get<T>(url: string): Promise<T> {
    return await makeRequest<T>(url, { headers: getHeaders() });
}

async function post<T>(url: string, data?: unknown) {
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
    const response = await fetch(url, options);
    
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