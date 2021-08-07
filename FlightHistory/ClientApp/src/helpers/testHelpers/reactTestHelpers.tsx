import React, { ReactElement } from "react";
import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export function renderWithRouter(component: ReactElement): RenderResult {
    return render(<MemoryRouter>{component}</MemoryRouter>);
}

export async function waitForTableToHaveResults() {
    await waitFor(() => expect(screen.getAllByRole("row").length).toBeGreaterThan(1));
}
