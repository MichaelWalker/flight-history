import type { ReactElement } from "react";
import React from "react";
import type { RenderResult } from "@testing-library/react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export function renderWithRouter(component: ReactElement): RenderResult {
    return render(<MemoryRouter>{component}</MemoryRouter>);
}

export async function waitForTableToHaveResults(): Promise<void> {
    const table = screen.getByTestId("table-body");
    await waitFor(() => expect(within(table).getAllByRole("row").length).toBeGreaterThan(0));
}
