import { getAccessToken } from "../helpers/tokenHelper";
import * as requests from "./requests";
import { anonymousPost, get, getList, post, toURL } from "./apiHelpers";
import { makeAuthenticatedRequest } from "./requests";
import { generateTestAccessToken } from "../helpers/stubTokenHelpers";

describe("apiHelpers", () => {
    const mockMakeRequest = jest.spyOn(requests, "makeRequest");
    const mockMakeAuthenticatedRequest = jest.spyOn(requests, "makeAuthenticatedRequest");
    const token = generateTestAccessToken({
        name: "Mike Walker",
        email: "mike.walker@test.com",
    });
    const testItem = {
        id: 12,
    };

    beforeAll(() => {
        getAccessToken().set(token);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        getAccessToken().set(null);
    });

    describe("get", () => {
        it("should make authenticated request", async () => {
            const expectedOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            mockMakeAuthenticatedRequest.mockResolvedValueOnce(testItem);

            const result = await get("/test-url");

            expect(result).toBe(testItem);
            expect(mockMakeAuthenticatedRequest).toHaveBeenCalledWith("/test-url", expectedOptions);
        });
    });

    describe("getList", () => {
        const expectedOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const expectedResult = {
            items: [testItem],
            count: 1,
        };

        it("should make authenticated request", async () => {
            mockMakeAuthenticatedRequest.mockResolvedValueOnce(expectedResult);

            const result = await getList("/test-url", { page: 2, pageSize: 20 });

            expect(result).toBe(expectedResult);
            expect(mockMakeAuthenticatedRequest).toHaveBeenCalledWith(
                "http://localhost/test-url?page=2&pageSize=20",
                expectedOptions,
            );
        });

        it("should append sort query params if sort data is provided", async () => {
            mockMakeAuthenticatedRequest.mockResolvedValueOnce(expectedResult);

            const result = await getList(
                "/test-url",
                { page: 2, pageSize: 20 },
                { sortBy: "name", sortDirection: "ASC" },
            );

            expect(result).toBe(expectedResult);
            expect(mockMakeAuthenticatedRequest).toHaveBeenCalledWith(
                "http://localhost/test-url?page=2&pageSize=20&sortBy=name&sortDirection=ASC",
                expectedOptions,
            );
        });

        it("should append search query params if search data is provided", async () => {
            mockMakeAuthenticatedRequest.mockResolvedValueOnce(expectedResult);

            const result = await getList("/test-url", { page: 2, pageSize: 20 }, undefined, "Mike");

            expect(result).toBe(expectedResult);
            expect(mockMakeAuthenticatedRequest).toHaveBeenCalledWith(
                "http://localhost/test-url?page=2&pageSize=20&search=Mike",
                expectedOptions,
            );
        });
    });

    describe("post", () => {
        it("should make authenticated POST request", async () => {
            const expectedOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: '{"name":"Mike"}',
            };

            mockMakeAuthenticatedRequest.mockResolvedValueOnce(testItem);

            const result = await post("/test-url", { name: "Mike" });

            expect(result).toBe(testItem);
            expect(mockMakeAuthenticatedRequest).toHaveBeenCalledWith("/test-url", expectedOptions);
        });
    });

    describe("anonymousPose", () => {
        it("should make unauthenticated POST request", async () => {
            const expectedOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: '{"name":"Mike"}',
            };

            mockMakeRequest.mockResolvedValueOnce(testItem);

            const result = await anonymousPost("/test-url", { name: "Mike" });

            expect(result).toBe(testItem);
            expect(mockMakeRequest).toHaveBeenCalledWith("/test-url", expectedOptions);
        });
    });

    describe("toURL", () => {
        it("handles http URLs", () => {
            const url = toURL("http://localhost/test-url?search=Mike");
            expect(url.host).toBe("localhost");
            expect(url.pathname).toBe("/test-url");
            expect(url.searchParams.get("search")).toBe("Mike");
        });

        it("handles https URLs", () => {
            const url = toURL("https://localhost/test-url?search=Mike");
            expect(url.host).toBe("localhost");
            expect(url.pathname).toBe("/test-url");
            expect(url.searchParams.get("search")).toBe("Mike");
        });

        it("handles relative URLs", () => {
            const url = toURL("/test-url?search=Mike");
            expect(url.host).toBe("localhost");
            expect(url.pathname).toBe("/test-url");
            expect(url.searchParams.get("search")).toBe("Mike");
        });
    });
});
