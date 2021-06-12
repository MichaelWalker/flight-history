import { User } from "../models/user";

export function generateTestAccessToken(user: User, expiresInMinutes = 5): string {
    const expiryDate = new Date().getTime() + expiresInMinutes * 60000;
    const header = btoa(JSON.stringify({ typ: "JWT", alg: "HS512" }));
    const payload = btoa(
        JSON.stringify({
            token_type: "access",
            jti: "abcd1234",
            exp: Math.round(expiryDate / 1000),
            user: user,
        }),
    );
    const signature = btoa("secret");

    return `${header}.${payload}.${signature}`;
}
