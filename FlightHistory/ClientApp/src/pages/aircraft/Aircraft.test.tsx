import "isomorphic-fetch";
import React from "react";
import { AircraftPage } from "./Aircraft";
import {
    renderWithRouter,
    waitForTableToHaveResults,
} from "../../helpers/testHelpers/reactTestHelpers";
import { mockUseConsoleLogging, mockUseSampleData } from "../../helpers/testHelpers/mockHelpers";

describe("AircraftPage", () => {
    it("matches snapshot", async () => {
        mockUseSampleData(true);
        mockUseConsoleLogging(false);

        const { container } = renderWithRouter(<AircraftPage />);

        await waitForTableToHaveResults();
        expect(container).toMatchSnapshot();
    });
});
