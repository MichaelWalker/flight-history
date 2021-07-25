import { accessToken, accessTokenAppearsValid, getCurrentUser } from "./tokenHelper";
import { generateTestAccessToken } from "./testHelper";
import { User } from "../models/user";

describe("token helper", () => {
    describe("getCurrentUser", () => {
        it("should parse token", () => {
            accessToken.set(
                generateTestAccessToken({
                    name: "Mike Walker",
                    email: "mike.walker@test.com",
                }),
            );

            const user = getCurrentUser();

            expect(user?.name).toBe("Mike Walker");
            expect(user?.email).toBe("mike.walker@test.com");
        });

        it("should handle missing name and email", () => {
            accessToken.set(
                generateTestAccessToken({
                    name: "",
                    email: "",
                }),
            );

            const user = getCurrentUser();

            expect(user?.name).toBe("");
            expect(user?.email).toBe("");
        });

        it("should handle null token", () => {
            accessToken.set(null);

            const user = getCurrentUser();

            expect(user).toBeUndefined();
        });
    });

    describe("accessTokenAppearsValid", () => {
        it("should return true for valid token", () => {
            accessToken.set(
                generateTestAccessToken(
                    {
                        name: "Mike Walker",
                        email: "mike.walker@test.com",
                    },
                    5,
                ),
            );

            expect(accessTokenAppearsValid()).toBeTruthy();
        });

        it("should return false if expiryTimestamp is missing", () => {
            accessToken.set(
                generateTestAccessToken(
                    {
                        name: "Mike Walker",
                        email: "mike.walker@test.com",
                    },
                    undefined,
                ),
            );

            expect(accessTokenAppearsValid()).toBeFalsy();
        });

        it("should return false if expiryTimestamp is in the past", () => {
            accessToken.set(
                generateTestAccessToken(
                    {
                        name: "Mike Walker",
                        email: "mike.walker@test.com",
                    },
                    -5,
                ),
            );

            expect(accessTokenAppearsValid()).toBeFalsy();
        });

        it("should return false if the email is missing", () => {
            accessToken.set(
                generateTestAccessToken(
                    {
                        name: "Mike Walker",
                        email: "",
                    },
                    5,
                ),
            );

            expect(accessTokenAppearsValid()).toBeFalsy();
        });

        it("should return false if the name is missing", () => {
            accessToken.set(
                generateTestAccessToken(
                    {
                        name: "",
                        email: "mike.walker@test.com",
                    },
                    5,
                ),
            );

            expect(accessTokenAppearsValid()).toBeFalsy();
        });

        it("should return false if there is no token", () => {
            accessToken.set(null);
            expect(accessTokenAppearsValid()).toBeFalsy();
        });
    });
});
