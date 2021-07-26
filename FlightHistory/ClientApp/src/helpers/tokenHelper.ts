import { Observable } from "./observable";
import type { User } from "../models/user";

interface ParsedToken {
    expiry?: number;
    user: User;
}

interface TokenBody {
    expiryTimestamp?: number;
    user?: {
        name?: string;
        email?: string;
    };
}

const accessToken = Observable.of<string | null>(null);
export function getAccessToken() {
    return accessToken;
}

function parseToken(): ParsedToken | undefined {
    const token = accessToken.get();
    if (!token) {
        return;
    }

    const encodedPayload = token.split(".")[1];
    const decodedPayload = atob(encodedPayload);
    const data = JSON.parse(decodedPayload) as TokenBody;

    return {
        expiry: data.expiryTimestamp,
        user: {
            name: data?.user?.name ?? "",
            email: data?.user?.email ?? "",
        },
    };
}

export function accessTokenAppearsValid(): boolean {
    const payload = parseToken();

    if (!payload) {
        return false;
    }

    if (!payload.expiry || payload.expiry < new Date().getTime()) {
        return false;
    }

    if (payload.user.name.trim() === "" || payload.user.email.trim() === "") {
        return false;
    }

    return true;
}

export function getCurrentUser(): User | undefined {
    return parseToken()?.user;
}
