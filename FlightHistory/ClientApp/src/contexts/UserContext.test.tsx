import React, { useContext } from "react";
import { UserContext, UserContextProvider } from "./UserContext";
import { render, waitFor } from "@testing-library/react";
import { getAccessToken } from "../helpers/tokenHelper";
import {
    mockSuccessfulRefreshToken,
    mockUnsuccessfulRefreshToken,
} from "../helpers/testHelpers/mockHelpers";

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
    beforeEach(() => {
        getAccessToken().set(null);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        getAccessToken().set(null);
    });

    it("should refresh user data on initial load", async () => {
        mockSuccessfulRefreshToken();

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

    it("should handle failure to fetch user data", async () => {
        mockUnsuccessfulRefreshToken();

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
