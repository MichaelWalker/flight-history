import "isomorphic-fetch";
import React from "react";
import {
    renderWithRouter,
    waitForTableToHaveResults,
} from "../../helpers/testHelpers/reactTestHelpers";
import { mockUseConsoleLogging, mockUseSampleData } from "../../helpers/testHelpers/mockHelpers";
import { AirlinesPage } from "./Airlines";

describe("Airlines Page", () => {
    it("matches snapshot", async () => {
        mockUseSampleData(true);
        mockUseConsoleLogging(false);

        const { container } = renderWithRouter(<AirlinesPage />);

        await waitForTableToHaveResults();
        expect(container).toMatchSnapshot();
    });
});
