import * as httpApi from './httpApi';
import * as testApi from './test/testApi';
import {TokenModel} from "../models/tokenModel";
import {accessToken} from "../helpers/tokenHelper";

interface Api {
    signIn: (email: string, password: string) => Promise<TokenModel>;
    refreshToken: () => Promise<TokenModel>;
    signOut: () => Promise<void>;
}

const api: Api = USE_SAMPLE_DATA ? testApi : httpApi;

async function signIn(email: string, password: string): Promise<void> {
    try {
        const response = await api.signIn(email, password);
        accessToken.set(response?.token || null);
    } catch (error) {
        accessToken.set(null);
        throw error;
    }
}

async function refreshToken(): Promise<void> {
    try {
        const response = await api.refreshToken();
        accessToken.set(response.token);
    } catch (error) {
        accessToken.set(null);
        throw error;
    }
}

async function signOut(): Promise<void> {
    await api.signOut();
    accessToken.set(null);
}

export const ApiClient = {
    signIn,
    refreshToken,
    signOut,
}