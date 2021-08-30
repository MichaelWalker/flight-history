import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import React from "react";
import { stubFormField, StubFormFieldOptions } from "../useFormField/useFormField.testhelpers";
import { Select, SelectOption } from "./Select";
import userEvent from "@testing-library/user-event";

function sampleLoadOptions(search: string): Promise<SelectOption<string>[]> {
    return Promise.resolve(
        [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
        ].filter((option) => option.label.includes(search)),
    );
}

// TODO - find a better set of assertions for styles.
function expectLabelIsCollapsed() {
    expect(screen.getByText("Label").className).toBe("css-10z2f9h");
}

function expectLabelIsExpanded() {
    expect(screen.getByText("Label").className).toBe("css-10z2f9h");
}

function expectLabelIsCollapsedAndHighlighted() {
    expect(screen.getByText("Label").className).toBe("css-17k49f");
}

interface RenderOptions extends StubFormFieldOptions {}

function renderSelect(options: RenderOptions = {}): RenderResult {
    return render(
        <Select
            {...stubFormField(options)}
            toOptionLabel={(item) => `Option ${item}`}
            helpText={"Search by name or code"}
            loadOptions={sampleLoadOptions}
        />,
    );
}

describe("The Select Component", () => {
    describe("when unfocused", () => {
        it("has an expanded label if input is empty", () => {
            renderSelect({ isFocused: false });
            expectLabelIsExpanded();
        });

        it("has a collapsed label if input is not empty", () => {
            renderSelect({ isFocused: false, value: "1" });
            expectLabelIsCollapsed();
        });
    });

    describe("when focused", () => {
        it("has a collapsed label", async () => {
            renderSelect({ isFocused: true });
            expectLabelIsCollapsedAndHighlighted();
        });

        it("displays search instructions when search term is empty", async () => {
            renderSelect({ isFocused: true });

            userEvent.click(screen.getByLabelText("Label"));
            await waitFor(() =>
                expect(screen.getByText("Search by name or code")).toBeInTheDocument(),
            );
        });

        it("displays search results when search finds options", async () => {
            renderSelect({ isFocused: true });

            const input = screen.getByLabelText("Label");
            userEvent.click(input);
            userEvent.type(input, "Opt");
            await waitFor(() => {
                expect(screen.getByText("Option 1")).toBeInTheDocument();
                expect(screen.getByText("Option 2")).toBeInTheDocument();
            });
        });

        it("displays 'no results' message when search results are empty", async () => {
            renderSelect({ isFocused: true });

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
            const onChange = jest.fn();
            renderSelect({ onChange, isFocused: true });

            const input = screen.getByLabelText("Label") as HTMLSelectElement;
            userEvent.type(input, "Opt");
            await waitFor(() => {
                const option1 = screen.getByText("Option 1");
                userEvent.click(option1);
            });

            expect(onChange).toHaveBeenCalledWith("1");
        });

        it("allows removing a value", async () => {
            const onChange = jest.fn();
            renderSelect({ value: "1", onChange, isFocused: true });

            expect(screen.getByText("Option 1")).toBeInTheDocument();
            userEvent.click(screen.getByLabelText("Clear"));

            await waitFor(() => expect(onChange).toHaveBeenCalledWith(null));
        });
    });
});
