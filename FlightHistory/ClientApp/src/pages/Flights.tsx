import type { FunctionComponent } from "react";
import React from "react";
import { Page } from "./Page";
import { FlightsTable } from "../components/flights/FlightsTable";
import { CardSection } from "../components/layouts/CardSection";

export const FlightsPage: FunctionComponent = () => {
    return (
        <Page title={"Flights"}>
            <CardSection title="Flights">
                <FlightsTable />
            </CardSection>
        </Page>
    );
};
