import type { StubApiResponse } from "./stubApiResponse";
import type { User } from "../../models/user";
import { generateTestAccessToken } from "../../helpers/stubTokenHelpers";
import { stubUser } from "../../models/user.testdata";
import { stubToken } from "../../models/token.testdata";

export let signedInUser: User | null = stubUser;

export function setSignedInUser(user: User | null) {
    signedInUser = user;
}

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

            signedInUser = stubUser;
            return new Response(
                JSON.stringify({
                    token: stubToken,
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
