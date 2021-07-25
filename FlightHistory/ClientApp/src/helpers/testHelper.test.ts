import { generateTestAccessToken } from "./testHelper";

describe("testHelper", () => {
    it("should generate valid token", () => {
        const user = {
            name: "Mike Walker",
            email: "mike.walker@test.com",
        };

        const token = generateTestAccessToken(user);

        expect(token).toBe(
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7Im5hbWUiOiJNaWtlIFdhbGtlciIsImVtYWlsIjoibWlrZS53YWxrZXJAdGVzdC5jb20ifX0=.c2VjcmV0",
        );
    });
});
