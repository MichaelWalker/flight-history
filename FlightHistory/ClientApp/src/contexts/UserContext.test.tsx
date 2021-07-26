import React, { useContext } from "react";
import { UserContext, UserContextProvider } from "./UserContext";
import { render, waitFor } from "@testing-library/react";
import { AuthClient } from "../api/authClient";
import { generateTestAccessToken } from "../helpers/testHelper";
import { getAccessToken } from "../helpers/tokenHelper";
import { User } from "../models/user";

const TestComponent = () => {
    const { loading, currentUser } = useContext(UserContext);

    return (
        <>
            <div>loading: {loading ? "true" : "false"}</div>
            <div>user: {currentUser?.name ?? "Not Set"}</div>
        </>
    );
};

describe("User Context", () => {
    let mockRefreshToken: jest.SpyInstance;

    function mockRefreshTokenImplementation(accessToken: string | null): void {
        mockRefreshToken = jest.spyOn(AuthClient, "refreshToken").mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    getAccessToken().set(accessToken);
                    resolve();
                }, 0);
            });
        });
    }

    beforeEach(() => {
        getAccessToken().set(null);
    });

    afterEach(() => {
        mockRefreshToken.mockRestore();
    });

    afterAll(() => {
        getAccessToken().set(null);
    });

    it("should refresh user data on initial load", async () => {
        mockRefreshTokenImplementation(
            generateTestAccessToken({
                name: "Mike Walker",
                email: "mike.walker@test.com",
            }),
        );

        const { getByText } = render(
            <UserContextProvider>
                <TestComponent />
            </UserContextProvider>,
        );

        expect(getByText("loading: true")).toBeInTheDocument();
        expect(getByText("user: Not Set")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("loading: false")).toBeInTheDocument();
            expect(getByText("user: Mike Walker")).toBeInTheDocument();
        });
    });

    it("should handle access token being set to null", async () => {
        mockRefreshTokenImplementation(null);

        const { getByText } = render(
            <UserContextProvider>
                <TestComponent />
            </UserContextProvider>,
        );

        expect(getByText("loading: true")).toBeInTheDocument();
        expect(getByText("user: Not Set")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("loading: false")).toBeInTheDocument();
            expect(getByText("user: Not Set")).toBeInTheDocument();
        });
    });

    it("should handle failure to fetch user data", async () => {
        mockRefreshToken = jest.spyOn(AuthClient, "refreshToken").mockRejectedValue("Oh No!");

        const { getByText } = render(
            <UserContextProvider>
                <TestComponent />
            </UserContextProvider>,
        );

        expect(getByText("loading: true")).toBeInTheDocument();
        expect(getByText("user: Not Set")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("loading: false")).toBeInTheDocument();
            expect(getByText("user: Not Set")).toBeInTheDocument();
        });
    });
});
