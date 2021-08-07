import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { TableOverlay } from "./TableOverlay";

describe("TableOverlay", () => {
    it("Returns null if state is SUCCESS", () => {
        const state = {
            status: "SUCCESS",
            data: {},
        } as const;

        const { container } = render(<TableOverlay state={state} reload={jest.fn()} />);

        expect(container).toBeEmptyDOMElement();
    });

    it("Returns loading overlay if state is LOADING", () => {
        const state = {
            status: "LOADING",
        } as const;

        const { getByTestId } = render(<TableOverlay state={state} reload={jest.fn()} />);

        expect(getByTestId("table-loading-overlay")).toBeInTheDocument();
    });

    it("Returns loading overlay if state is RELOADING", () => {
        const state = {
            status: "RELOADING",
            data: {},
        } as const;

        const { getByTestId } = render(<TableOverlay state={state} reload={jest.fn()} />);

        expect(getByTestId("table-loading-overlay")).toBeInTheDocument();
    });

    it("Returns error overlay if state is ERROR", () => {
        const state = {
            status: "FAILED",
            error: new Error(),
        } as const;

        const { getByTestId, getByText } = render(
            <TableOverlay state={state} reload={jest.fn()} />,
        );

        expect(getByTestId("table-error-overlay")).toBeInTheDocument();
        expect(getByText("Sorry, something went wrong.")).toBeInTheDocument();
    });

    it("Calls the reload function when the retry button is clicked", () => {
        const state = {
            status: "FAILED",
            error: new Error(),
        } as const;
        const retryFunction = jest.fn();

        const { getByText } = render(<TableOverlay state={state} reload={retryFunction} />);

        fireEvent.click(getByText("Retry"));

        expect(retryFunction).toHaveBeenCalled();
    });
});
