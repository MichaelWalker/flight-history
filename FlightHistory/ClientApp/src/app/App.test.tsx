import React from "react";
import { mockUseConsoleLogging, mockUseSampleData } from "../helpers/testHelpers/mockHelpers";
import { render, waitFor } from "@testing-library/react";
import { getAccessToken } from "../helpers/tokenHelper";
import { setSignedInUser, signedInUser } from "../api/stub/authStubs";
import { stubUser } from "../models/user.testdata";
import { App } from "./App";

describe("App", () => {
    const originalSignedInUser = signedInUser;

    beforeEach(() => {
        mockUseSampleData(true);
        mockUseConsoleLogging(false);
        getAccessToken().set(null);
    });

    afterEach(() => {
        jest.resetAllMocks();
        setSignedInUser(originalSignedInUser);
    });

    it("displays sign in page if user is not signed in", async () => {
        setSignedInUser(null);

        const { container, getByTestId } = render(<App />);

        expect(getByTestId("loading-animation")).toBeInTheDocument();
        expect(container).toMatchSnapshot("app-loading");

        await waitFor(() => expect(getByTestId("page-title").textContent).toBe("Sign In"));
        expect(container).toMatchSnapshot("sign-in-page");
    });

    it("displays dashboard if user is signed in", async () => {
        setSignedInUser(stubUser);

        const { container, getByTestId } = render(<App />);

        expect(getByTestId("loading-animation")).toBeInTheDocument();
        expect(container).toMatchSnapshot("app-loading");

        await waitFor(() => expect(getByTestId("page-title").textContent).toBe("Dashboard"));
        expect(container).toMatchSnapshot("dashboard-page");
    });
});
