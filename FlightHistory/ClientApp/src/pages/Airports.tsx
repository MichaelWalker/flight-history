import type { FunctionComponent } from "react";
import React from "react";
import { Page } from "./Page";
import { AirportsTable } from "../components/airports/AirportsTable";
import { CardSection } from "../components/layouts/CardSection";

export const AirportsPage: FunctionComponent = () => {
    return (
        <Page title={"Airports"}>
            <CardSection title="Airports">
                <AirportsTable />
            </CardSection>
        </Page>
    );
};
