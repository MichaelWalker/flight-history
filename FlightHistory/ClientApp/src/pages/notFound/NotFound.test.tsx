import "isomorphic-fetch";
import React from "react";
import { renderWithRouter } from "../../helpers/testHelpers/reactTestHelpers";
import { NotFoundPage } from "./NotFound";

describe("NotFound Page", () => {
    it("matches snapshot", async () => {
        const { container } = renderWithRouter(<NotFoundPage />);
        expect(container).toMatchSnapshot();
    });
});
