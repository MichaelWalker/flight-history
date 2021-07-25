import React, { FC, ReactElement } from "react";
import { Header, Table } from "./Table";
import { ItemListResponse, Pagination, Sort } from "../../api/apiHelpers";
import { TextTableCell } from "./cells/TextTableCell";
import { fireEvent, getByLabelText, render, waitFor } from "@testing-library/react";

interface TestItem {
    id: number;
    name: string;
}

function renderRow(item: TestItem): ReactElement {
    return <TextTableCell text={item.name} />;
}

const Headers: Header[] = [{ displayName: "Name Header" }];

interface TestTableProps {
    fetchItems: (
        pagination: Pagination,
        sort?: Sort,
        search?: string,
    ) => Promise<ItemListResponse<TestItem>>;
}

const TestTable: FC<TestTableProps> = ({ fetchItems }) => {
    return <Table fetchItems={fetchItems} renderRow={renderRow} headers={Headers} />;
};

const SampleResponseData: ItemListResponse<TestItem> = {
    items: [
        { id: 1, name: "Item One" },
        { id: 2, name: "Item Two" },
        { id: 3, name: "Item Three" },
    ],
    count: 3,
};

describe("Table", () => {
    it("renders table with loading screen", async () => {
        const fetchItems = jest.fn();
        fetchItems.mockResolvedValue(SampleResponseData);

        const { getByTestId, getByText } = render(<TestTable fetchItems={fetchItems} />);

        expect(getByTestId("table-loading-overlay")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("Item One")).toBeInTheDocument();
            expect(getByText("Item Two")).toBeInTheDocument();
            expect(getByText("Item Three")).toBeInTheDocument();
            expect(getByText("Name Header")).toBeInTheDocument();
            expect(getByText("Page 1 of 1")).toBeInTheDocument();
        });
    });

    it("renders error page with retry option on failure", async () => {
        const fetchItems = jest.fn();
        fetchItems.mockRejectedValueOnce("Oh No!").mockResolvedValueOnce(SampleResponseData);

        const { getByTestId, getByText } = render(<TestTable fetchItems={fetchItems} />);

        expect(getByTestId("table-loading-overlay")).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("Sorry, something went wrong.")).toBeInTheDocument();
        });

        fireEvent.click(getByText("Retry"));

        await waitFor(() => {
            expect(getByTestId("table-loading-overlay")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(getByText("Item One")).toBeInTheDocument();
        });
    });

    it("allows users to change page", async () => {
        const fetchItems = jest.fn().mockImplementation((pagination: Pagination) => {
            if (pagination.page === 2) {
                return {
                    items: [{ id: 11, name: "Item Eleven" }],
                    count: 11,
                };
            }

            return {
                items: [
                    { id: 1, name: "Item One" },
                    { id: 2, name: "Item Two" },
                ],
                count: 11,
            };
        });

        const { getByTestId, queryByText } = render(<TestTable fetchItems={fetchItems} />);

        await waitFor(() => {
            expect(queryByText("Item One")).toBeInTheDocument();
            expect(queryByText("Item Eleven")).not.toBeInTheDocument();
        });

        fireEvent.click(getByTestId("next-page-button"));

        await waitFor(() => {
            expect(queryByText("Item One")).not.toBeInTheDocument();
            expect(queryByText("Item Eleven")).toBeInTheDocument();
        });
    });

    it("allows users to change page size", async () => {
        const fetchItems = jest.fn().mockImplementation((pagination: Pagination) => {
            if (pagination.pageSize === 20) {
                return {
                    items: [
                        { id: 1, name: "Item One" },
                        { id: 2, name: "Item Two" },
                        { id: 11, name: "Item Eleven" },
                    ],
                    count: 11,
                };
            }

            return {
                items: [
                    { id: 1, name: "Item One" },
                    { id: 2, name: "Item Two" },
                ],
                count: 11,
            };
        });

        const { getByLabelText, queryByText } = render(<TestTable fetchItems={fetchItems} />);

        await waitFor(() => {
            expect(queryByText("Item One")).toBeInTheDocument();
            expect(queryByText("Item Eleven")).not.toBeInTheDocument();
        });

        fireEvent.click(getByLabelText("20 results per page"));

        await waitFor(() => {
            expect(queryByText("Item One")).toBeInTheDocument();
            expect(queryByText("Item Eleven")).toBeInTheDocument();
        });
    });
});
