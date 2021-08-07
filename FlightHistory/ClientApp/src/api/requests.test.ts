import "isomorphic-fetch";
import * as fetch from "./fetch";
import * as tokenHelper from "../helpers/tokenHelper";
import { AuthClient } from "./authClient";
import { ApiError, makeAuthenticatedRequest, makeRequest } from "./requests";

interface TestItem {
    id: number;
    name: string;
}

describe("requests", () => {
    const mockFetch = jest.spyOn(fetch, "fetch");
    const mockAccessTokenAppearsValid = jest.spyOn(tokenHelper, "accessTokenAppearsValid");
    const mockRefreshToken = jest.spyOn(AuthClient, "refreshToken");

    const options = {};
    const successResponse = () => new Response(JSON.stringify({ id: 1, name: "Mike" }));
    const failedResponse = () =>
        new Response(JSON.stringify({ message: "Something went wrong" }), {
            status: 500,
        });
    const emptyErrorResponse = () => new Response(null, { status: 500 });
    const unauthorisedResponse = () =>
        new Response(JSON.stringify({ message: "Unauthorised" }), {
            status: 401,
        });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("makeRequest", () => {
        it("should make request and return response body", async () => {
            mockFetch.mockResolvedValue(successResponse());

            const result = await makeRequest<TestItem>("/test", options);

            expect(mockFetch).toHaveBeenCalledWith("/test", options);
            expect(result.id).toBe(1);
            expect(result.name).toBe("Mike");
        });

        it("should throw ApiError on failure", async () => {
            mockFetch.mockResolvedValue(failedResponse());

            await expect(makeRequest("/test", options)).rejects.toThrow(
                new ApiError('{"message":"Something went wrong"}', 500),
            );
        });

        it("handles error responses without json body", async () => {
            mockFetch.mockResolvedValueOnce(emptyErrorResponse());

            await expect(makeRequest("/test", options)).rejects.toThrow(new ApiError("", 500));
        });
    });

    describe("makeAuthenticatedRequest", () => {
        it("should make request and return response body", async () => {
            mockAccessTokenAppearsValid.mockReturnValueOnce(true);
            mockFetch.mockResolvedValueOnce(successResponse());

            const result = await makeAuthenticatedRequest<TestItem>("/test", options);

            expect(mockFetch).toHaveBeenCalledWith("/test", options);
            expect(result.id).toBe(1);
            expect(result.name).toBe("Mike");
        });

        it("should throw ApiError on failure", async () => {
            mockAccessTokenAppearsValid.mockReturnValueOnce(true);
            mockFetch.mockResolvedValue(failedResponse());

            await expect(makeAuthenticatedRequest("/test", options)).rejects.toThrow(
                new ApiError('{"message":"Something went wrong"}', 500),
            );
        });

        it("should refresh token if not valid", async () => {
            mockAccessTokenAppearsValid.mockReturnValueOnce(false);
            mockRefreshToken.mockResolvedValueOnce();
            mockFetch.mockResolvedValueOnce(successResponse());

            const result = await makeAuthenticatedRequest<TestItem>("/test", options);

            expect(mockRefreshToken).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith("/test", options);
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(result.id).toBe(1);
            expect(result.name).toBe("Mike");
        });

        it("should refresh token on 401 response", async () => {
            mockAccessTokenAppearsValid.mockReturnValueOnce(true);
            mockRefreshToken.mockResolvedValueOnce();
            mockFetch
                .mockResolvedValueOnce(unauthorisedResponse())
                .mockResolvedValueOnce(successResponse());

            const result = await makeAuthenticatedRequest<TestItem>("/test", options);

            expect(mockRefreshToken).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith("/test", options);
            expect(mockFetch).toHaveBeenCalledTimes(2);
            expect(result.id).toBe(1);
            expect(result.name).toBe("Mike");
        });

        it("should throw 401 Api Error if refresh fails", async () => {
            mockAccessTokenAppearsValid.mockReturnValueOnce(true);
            mockRefreshToken.mockResolvedValueOnce();
            mockFetch
                .mockResolvedValueOnce(unauthorisedResponse())
                .mockResolvedValueOnce(unauthorisedResponse());

            await expect(makeAuthenticatedRequest("/test", options)).rejects.toThrow(
                new ApiError('{"message":"Unauthorised"}', 401),
            );

            expect(mockFetch).toHaveBeenCalledTimes(2);
        });
    });
});
