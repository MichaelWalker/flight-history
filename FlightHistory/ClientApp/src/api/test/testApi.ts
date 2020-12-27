import {FakeUser, SampleUser, SampleUsers} from "./sampleUserData";
import {ApiError} from "../apiError";
import {getCurrentUser} from "../../helpers/tokenHelper";
import {generateTestAccessToken} from "../../helpers/testHelper";
import {TokenModel} from "../../models/tokenModel";

// Sets the proportion of calls to the fake API that will be simulated to fail.
// 0 => no calls will ever fail
// 1 => all calls will always fail
const FAILURE_RATE = 0;

// The fake API can add delays to all requests. This setting represents the delay in milliseconds.
let RESPONSE_TIME = 500;

// When you first load the app, it tries to 'refresh' the access token.
// The user set here is the person you will be 'logged in' as.
// Valid options are:
//   - RegularMember
//   - AdminMember
//   - NewMember (without a full name set so will start on the update profile page)
//   - null (you will start as signed out and need to sign in)
let REFRESH_TOKEN_USER: FakeUser | null = SampleUser;

interface ResponseOptions {
    skipTokenCheck?: boolean;
    failureRate?: number;
}

export async function signIn(email: string, password: string): Promise<TokenModel> {
    const matchingUser = SampleUsers.find(user => user.email === email && user.password === password);

    if (!matchingUser) {
        throw new ApiError("No matching username and password combination", 401);
    }

    const response = {
        token: generateTestAccessToken(matchingUser.details)
    };
    REFRESH_TOKEN_USER = matchingUser;

    return await mockApiResponse(response, { skipTokenCheck: true, failureRate: 0 });
}

export async function refreshToken(): Promise<TokenModel> {
    if (!REFRESH_TOKEN_USER) {
        throw new ApiError("No valid refresh token present", 401);
    }

    const response = {
        token: generateTestAccessToken(REFRESH_TOKEN_USER.details)
    };
    return await mockApiResponse(response, { skipTokenCheck: true, failureRate: 0 });
}

export async function signOut(): Promise<void> {
    REFRESH_TOKEN_USER = null;
    await mockApiResponse(null);
}

const mockApiResponse = <T> (value: T, options: ResponseOptions = {}): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            if (!options.skipTokenCheck) {
                const currentUser = getCurrentUser();

                if (!currentUser) {
                    reject(new ApiError("Unauthenticated - your token is missing or invalid", 401));
                    return;
                }
            }

            // istanbul ignore next - just a debug feature... and not covered in tests
            const failureRate = options.failureRate || FAILURE_RATE
            if (Math.random() < failureRate) {
                reject(new ApiError("Oh No! Something went wrong", 500));
            }

            resolve(value);
        }, RESPONSE_TIME);
    });
};