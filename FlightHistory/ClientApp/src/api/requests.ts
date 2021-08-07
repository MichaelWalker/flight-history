import { accessTokenAppearsValid } from "../helpers/tokenHelper";
import { fetch } from "./fetch";
import { AuthClient } from "./authClient";

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export async function makeAuthenticatedRequest<T>(url: string, options: RequestInit): Promise<T> {
    if (!accessTokenAppearsValid()) {
        await AuthClient.refreshToken();
    }

    try {
        return await makeRequest(url, options);
    } catch (exception) {
        if (exception.status === 401) {
            await AuthClient.refreshToken();
            return makeRequest(url, options);
        }

        throw exception;
    }
}

export async function makeRequest<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (response.ok) {
        return response.json();
    }

    const errorResponse = await getBody<T>(response);
    throw new ApiError(JSON.stringify(errorResponse), response.status);
}

async function getBody<T>(response: Response): Promise<T | undefined> {
    try {
        return await response.json();
    } catch (_) {
        return undefined;
    }
}
