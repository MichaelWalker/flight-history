import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import React from "react";
import { LoadOptions, Select, SelectOption } from "./Select";
import userEvent from "@testing-library/user-event";

function sampleLoadOptions(search: string): Promise<SelectOption<string>[]> {
    return Promise.resolve(
        [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
        ].filter((option) => option.label.includes(search)),
    );
}

function expectLabelIsCollapsed() {
    expect(screen.getByText("Label").className).toBe("css-1vqa8ah");
}

function expectLabelIsExpanded() {
    expect(screen.getByText("Label").className).toBe("css-exi4rs");
}

function expectLabelIsExpandedAndHighlighted() {
    expect(screen.getByText("Label").className).toBe("css-1vqa8ah");
}

function expectLabelIsCollapsedAndHighlighted() {
    expect(screen.getByText("Label").className).toBe("css-ixt891");
}

interface RenderSelectOptions {
    value?: string | null;
    setValue?: (option: string | null) => void;
    loadOptions?: LoadOptions<string>;
}

function renderSelect({
    value = null,
    setValue = jest.fn(),
    loadOptions = sampleLoadOptions,
}: RenderSelectOptions = {}): RenderResult {
    return render(
        <Select
            label={"Label"}
            loadOptions={loadOptions}
            value={value}
            setValue={setValue}
            toOptionLabel={(item) => `Option ${item}`}
            helpText={"Search by name or code"}
        />,
    );
}

describe("The Select Component", () => {
    describe("when unfocused", () => {
        it("has an expanded label if input is empty", () => {
            renderSelect();
            expectLabelIsCollapsed();
        });

        it("has a collapsed label if input is not empty", () => {
            renderSelect({ value: "1" });
            expectLabelIsExpanded();
        });
    });

    describe("when focused", () => {
        it("has a collapsed label", async () => {
            renderSelect();

            expectLabelIsExpandedAndHighlighted();
            userEvent.click(screen.getByLabelText("Label"));
            await waitFor(expectLabelIsCollapsedAndHighlighted);
        });

        it("displays search instructions when search term is empty", async () => {
            renderSelect();

            userEvent.click(screen.getByLabelText("Label"));
            await waitFor(() =>
                expect(screen.getByText("Search by name or code")).toBeInTheDocument(),
            );
        });

        it("displays search results when search finds options", async () => {
            renderSelect();

            const input = screen.getByLabelText("Label");
            userEvent.click(input);
            userEvent.type(input, "Opt");
            await waitFor(() => {
                expect(screen.getByText("Option 1")).toBeInTheDocument();
                expect(screen.getByText("Option 2")).toBeInTheDocument();
            });
        });

        it("displays 'no results' message when search results are empty", async () => {
            renderSelect();

            const input = screen.getByLabelText("Label");
            userEvent.click(input);
            userEvent.type(input, "Invalid");
            await waitFor(() => {
                expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
                expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
                expect(screen.getByText("No results")).toBeInTheDocument();
            });
        });

        it("allows selecting a value", async () => {
            const setValue = jest.fn();
            renderSelect({ setValue });

            const input = screen.getByLabelText("Label") as HTMLSelectElement;
            userEvent.type(input, "Opt");
            await waitFor(() => {
                const option1 = screen.getByText("Option 1");
                userEvent.click(option1);
            });

            expect(setValue).toHaveBeenCalledWith("1");
        });

        it("allows removing a value", async () => {
            const setValue = jest.fn();
            renderSelect({ value: "1", setValue });

            expect(screen.getByText("Option 1")).toBeInTheDocument();
            userEvent.click(screen.getByLabelText("Clear"));

            await waitFor(() => expect(setValue).toHaveBeenCalledWith(null));
        });
    });
});
