import type { ReactElement } from "react";
import React from "react";
import type { RenderResult } from "@testing-library/react";
import { fireEvent, render } from "@testing-library/react";
import { TableHeaderItem } from "./TableHeaderItem";

function renderInTableHeaderRow(component: ReactElement): RenderResult {
    return render(
        <table>
            <thead>
                <tr>{component}</tr>
            </thead>
        </table>,
    );
}

describe("TableHeader", () => {
    describe("with sortable field", () => {
        it("renders a clickable header", () => {
            const { getByRole } = renderInTableHeaderRow(
                <TableHeaderItem
                    displayName={"Name"}
                    sortBy={"name"}
                    currentSort={undefined}
                    setSort={jest.fn()}
                />,
            );

            expect(getByRole("button").textContent).toBe("Name");
        });

        it("sets the sort to this field if not previously selected", () => {
            const setSort = jest.fn();
            const { getByText } = renderInTableHeaderRow(
                <TableHeaderItem
                    displayName={"Name"}
                    sortBy={"name"}
                    currentSort={{ sortBy: "otherField", sortDirection: "ASC" }}
                    setSort={setSort}
                />,
            );

            fireEvent.click(getByText("Name"));

            expect(setSort).toHaveBeenCalledWith({ sortBy: "name", sortDirection: "ASC" });
        });

        it("toggles sort direction to DESC if set to ASC", () => {
            const setSort = jest.fn();
            const { getByText } = renderInTableHeaderRow(
                <TableHeaderItem
                    displayName={"Name"}
                    sortBy={"name"}
                    currentSort={{ sortBy: "name", sortDirection: "ASC" }}
                    setSort={setSort}
                />,
            );

            fireEvent.click(getByText("Name"));

            expect(setSort).toHaveBeenCalledWith({ sortBy: "name", sortDirection: "DESC" });
        });

        it("toggles sort direction to ASC if set to DESC", () => {
            const setSort = jest.fn();
            const { getByText } = renderInTableHeaderRow(
                <TableHeaderItem
                    displayName={"Name"}
                    sortBy={"name"}
                    currentSort={{ sortBy: "name", sortDirection: "DESC" }}
                    setSort={setSort}
                />,
            );

            fireEvent.click(getByText("Name"));

            expect(setSort).toHaveBeenCalledWith({ sortBy: "name", sortDirection: "ASC" });
        });
    });

    describe("with non-sortable field", () => {
        it("renders a non-clickable header", () => {
            const { queryAllByRole, getByText } = renderInTableHeaderRow(
                <TableHeaderItem
                    displayName={"Name"}
                    sortBy={undefined}
                    currentSort={undefined}
                    setSort={jest.fn()}
                />,
            );

            expect(queryAllByRole("button").length).toBe(0);
            expect(getByText("Name")).toBeInTheDocument();
        });
    });
});
