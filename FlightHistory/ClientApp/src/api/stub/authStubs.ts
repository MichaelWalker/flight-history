import {StubApiResponse} from "./stubApiResponse";
import {generateTestAccessToken} from "../../helpers/testHelper";
import {User} from "../../models/user";

const TestUser = {
    name: "User",
    email: "user@sample.com",
}

let SignedInUser: User | null = TestUser;

export const AuthStubs: StubApiResponse[] = [
    {
        url: '/api/auth/sign-in',
        method: 'POST',
        getResponseBody: (url, data) => {
            const parsedData = JSON.parse(data) as { email: string, password: string }
            const { email, password } = parsedData;
            
            if (email !== 'user@sample.com' || password !== 'password') {
                return {
                    ...Response.error(),
                    status: 401,
                }
            }
            
            SignedInUser = TestUser;
            return new Response(JSON.stringify({
                token: generateTestAccessToken(TestUser),
            }));
        },
        allowUnauthorised: true,
    },
    {
        url: '/api/auth/refresh',
        method: 'POST',
        getResponseBody: () => {
            if (!SignedInUser) {
                return { 
                    ...Response.error(), 
                    status: 401
                }
            }
            return new Response(JSON.stringify({
                token: generateTestAccessToken(SignedInUser),
            }));
        },
        allowUnauthorised: true,
    },
    {
        url: '/api/auth/sign-out',
        method: 'POST',
        getResponseBody: () => {
            SignedInUser = null;
            return new Response('');
        },
    }
];
