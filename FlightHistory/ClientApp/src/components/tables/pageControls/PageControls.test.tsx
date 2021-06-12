import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { PageControls } from "./PageControls";
import { get, Pagination } from "../../../api/apiHelpers";

describe("PageControls", () => {
    const pageControlsTestId = "page-controls";
    let mockSetPagination: (pagination: Pagination) => void;

    beforeEach(() => {
        mockSetPagination = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("for a single page", () => {
        it("should not render", () => {
            const pagination = { page: 1, pageSize: 20 };
            const { queryByTestId } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={10}
                />,
            );

            expect(queryByTestId(pageControlsTestId)).not.toBeInTheDocument();
        });
    });

    describe("for multiple pages", () => {
        it("should render controls", () => {
            const pagination = { page: 2, pageSize: 20 };
            const { getByTestId, getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByTestId(pageControlsTestId)).toBeInTheDocument();
            expect((getByText("«") as HTMLButtonElement).disabled).toBeFalsy();
            expect((getByText("‹") as HTMLButtonElement).disabled).toBeFalsy();
            expect((getByText("›") as HTMLButtonElement).disabled).toBeFalsy();
            expect((getByText("»") as HTMLButtonElement).disabled).toBeFalsy();
            expect(getByText("Page 2 of 5")).toBeInTheDocument();
        });

        it("should disable previous and first buttons on first page", () => {
            const pagination = { page: 1, pageSize: 20 };
            const { getByTestId, getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByTestId(pageControlsTestId)).toBeInTheDocument();
            expect((getByText("«") as HTMLButtonElement).disabled).toBeTruthy();
            expect((getByText("‹") as HTMLButtonElement).disabled).toBeTruthy();
            expect((getByText("›") as HTMLButtonElement).disabled).toBeFalsy();
            expect((getByText("»") as HTMLButtonElement).disabled).toBeFalsy();
            expect(getByText("Page 1 of 5")).toBeInTheDocument();
        });

        it("should disable next and last buttons when on last page", () => {
            const pagination = { page: 5, pageSize: 20 };
            const { getByTestId, getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByTestId(pageControlsTestId)).toBeInTheDocument();
            expect((getByText("«") as HTMLButtonElement).disabled).toBeFalsy();
            expect((getByText("‹") as HTMLButtonElement).disabled).toBeFalsy();
            expect((getByText("›") as HTMLButtonElement).disabled).toBeTruthy();
            expect((getByText("»") as HTMLButtonElement).disabled).toBeTruthy();
            expect(getByText("Page 5 of 5")).toBeInTheDocument();
        });

        it("should move you to first page", () => {
            const pagination = { page: 3, pageSize: 20 };
            const { getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByText("Page 3 of 5")).toBeInTheDocument();
            fireEvent.click(getByText("«"));

            waitFor(() => {
                expect(getByText("Page 1 of 5")).toBeInTheDocument();
            });
        });

        it("should move you to previous page", () => {
            const pagination = { page: 3, pageSize: 20 };
            const { getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByText("Page 3 of 5")).toBeInTheDocument();
            fireEvent.click(getByText("‹"));

            waitFor(() => {
                expect(getByText("Page 2 of 5")).toBeInTheDocument();
            });
        });

        it("should move you to next page", () => {
            const pagination = { page: 3, pageSize: 20 };
            const { getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByText("Page 3 of 5")).toBeInTheDocument();
            fireEvent.click(getByText("›"));

            waitFor(() => {
                expect(getByText("Page 4 of 5")).toBeInTheDocument();
            });
        });

        it("should move you to last page", () => {
            const pagination = { page: 3, pageSize: 20 };
            const { getByText } = render(
                <PageControls
                    pagination={pagination}
                    setPagination={mockSetPagination}
                    totalCount={100}
                />,
            );

            expect(getByText("Page 3 of 5")).toBeInTheDocument();
            fireEvent.click(getByText("»"));

            waitFor(() => {
                expect(getByText("Page 5 of 5")).toBeInTheDocument();
            });
        });
    });
});
