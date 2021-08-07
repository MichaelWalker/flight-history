import "isomorphic-fetch";
import React from "react";
import {
    renderWithRouter,
    waitForTableToHaveResults,
} from "../../helpers/testHelpers/reactTestHelpers";
import { mockUseConsoleLogging, mockUseSampleData } from "../../helpers/testHelpers/mockHelpers";
import { FlightsPage } from "./Flights";

describe("Flights Page", () => {
    it("matches snapshot", async () => {
        mockUseSampleData(true);
        mockUseConsoleLogging(false);

        const { container } = renderWithRouter(<FlightsPage />);

        await waitForTableToHaveResults();
        expect(container).toMatchSnapshot();
    });
});
