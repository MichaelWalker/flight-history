import type { StubApiResponse } from "./stubApiResponse";
import { generateTestAccessToken } from "../../helpers/testHelper";
import type { User } from "../../models/user";

const TestUser = {
    name: "User",
    email: "user@sample.com",
};

let signedInUser: User | null = TestUser;

export const AuthStubs: StubApiResponse[] = [
    {
        url: "/api/auth/sign-in",
        method: "POST",
        getResponseBody: (url: string, data: string): Response => {
            const parsedData = JSON.parse(data) as {
                email: string;
                password: string;
            };
            const { email, password } = parsedData;

            if (email !== "user@sample.com" || password !== "password") {
                return {
                    ...Response.error(),
                    status: 401,
                };
            }

            signedInUser = TestUser;
            return new Response(
                JSON.stringify({
                    token: generateTestAccessToken(TestUser, 5),
                }),
            );
        },
        allowUnauthorised: true,
    },
    {
        url: "/api/auth/refresh",
        method: "POST",
        getResponseBody: (): Response => {
            if (!signedInUser) {
                return {
                    ...Response.error(),
                    status: 401,
                };
            }
            return new Response(
                JSON.stringify({
                    token: generateTestAccessToken(signedInUser, 5),
                }),
            );
        },
        allowUnauthorised: true,
    },
    {
        url: "/api/auth/sign-out",
        method: "POST",
        getResponseBody: (): Response => {
            signedInUser = null;
            return new Response("");
        },
    },
];
