import {Observable} from "./observable";
import {User} from "../models/user";

interface ParsedToken {
    expiry?: number;
    user: User;
}

export const accessToken = Observable.of<string | null>(null);

function parseToken(): ParsedToken | undefined {
    const token = accessToken.get();
    if (!token) {
        return;
    }

    const encodedPayload = token.split('.')[1];
    const decodedPayload = atob(encodedPayload);
    const data = JSON.parse(decodedPayload);

    return {
        expiry: tryParseExpiry(data),
        user: {
            name: data.name,
            email: data.email,
        }
    }
}

function tryParseExpiry(data: { exp?: number }): number | undefined {
    const expiry = data.exp;

    if (!expiry) {
        return;
    }

    return expiry * 1000;
}

export function accessTokenAppearsValid(): boolean {
    const payload = parseToken();

    if (!payload) {
        return false;
    }

    if (payload.expiry && payload.expiry < new Date().getTime()) {
        return false;
    }

    return true;
}

export function getCurrentUser(): User | undefined {
    return parseToken()?.user;
}