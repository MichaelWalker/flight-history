import "isomorphic-fetch";
import React from "react";
import { renderWithRouter } from "../../helpers/testHelpers/reactTestHelpers";
import { DashboardPage } from "./Dashboard";

describe("Dashboard Page", () => {
    it("matches snapshot", async () => {
        const { container } = renderWithRouter(<DashboardPage />);
        expect(container).toMatchSnapshot();
    });
});
