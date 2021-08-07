import "isomorphic-fetch";
import React from "react";
import { renderWithRouter } from "../../helpers/testHelpers/reactTestHelpers";
import { SignInPage } from "./SignInPage";

describe("SignIn Page", () => {
    it("matches snapshot", async () => {
        const { container } = renderWithRouter(<SignInPage />);
        expect(container).toMatchSnapshot();
    });
});
