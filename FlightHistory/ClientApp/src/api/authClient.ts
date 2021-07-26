import { getAccessToken } from "../helpers/tokenHelper";
import type { Token } from "../models/token";
import { anonymousPost, post } from "./apiHelpers";

async function signIn(email: string, password: string): Promise<void> {
    try {
        const response = await anonymousPost<Token>("/api/auth/sign-in", {
            email,
            password,
        });
        getAccessToken().set(response?.token || null);
    } catch (error) {
        getAccessToken().set(null);
        throw error;
    }
}

async function refreshToken(): Promise<void> {
    try {
        const response = await anonymousPost<Token>("/api/auth/refresh");
        getAccessToken().set(response.token);
    } catch (error) {
        getAccessToken().set(null);
        throw error;
    }
}

async function signOut(): Promise<void> {
    await post<void>("/api/auth/sign-out");
    getAccessToken().set(null);
}

export const AuthClient = {
    signIn,
    refreshToken,
    signOut,
};
