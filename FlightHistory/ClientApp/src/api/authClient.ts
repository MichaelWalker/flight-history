import {accessToken} from "../helpers/tokenHelper";
import {TokenModel} from "../models/tokenModel";
import {anonymousPost, post} from "./apiHelpers";

async function signIn(email: string, password: string): Promise<void> {
    try {
        const response = await anonymousPost<TokenModel>(
            "/api/auth/sign-in",
            { email, password }
        );
        accessToken.set(response?.token || null);
    } catch (error) {
        accessToken.set(null);
        throw error;
    }
}

async function refreshToken(): Promise<void> {
    try {
        const response = await anonymousPost<TokenModel>("/api/auth/refresh");
        accessToken.set(response.token);
    } catch (error) {
        accessToken.set(null);
        throw error;
    }
}   

async function signOut(): Promise<void> {
    await post<void>("/api/auth/sign-out");
    accessToken.set(null);
}

export const AuthClient = {
    signIn,
    refreshToken,
    signOut,
}