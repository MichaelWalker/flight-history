import type { User } from "../models/user";

export function generateTestAccessToken(user: User, expiresInMinutes?: number): string {
    const header = btoa(JSON.stringify({ typ: "JWT", alg: "HS512" }));
    const payload = btoa(
        JSON.stringify({
            expiryTimestamp: expiresInMinutes
                ? new Date().getTime() + expiresInMinutes * 60000
                : undefined,
            user: user,
        }),
    );
    const signature = btoa("secret");

    return `${header}.${payload}.${signature}`;
}
