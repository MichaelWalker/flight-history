import "isomorphic-fetch";
import React from "react";
import {
    renderWithRouter,
    waitForTableToHaveResults,
} from "../../helpers/testHelpers/reactTestHelpers";
import { mockUseConsoleLogging, mockUseSampleData } from "../../helpers/testHelpers/mockHelpers";
import { AirportsPage } from "./Airports";

describe("Airports Page", () => {
    it("matches snapshot", async () => {
        mockUseSampleData(true);
        mockUseConsoleLogging(false);

        const { container } = renderWithRouter(<AirportsPage />);

        await waitForTableToHaveResults();
        expect(container).toMatchSnapshot();
    });
});
