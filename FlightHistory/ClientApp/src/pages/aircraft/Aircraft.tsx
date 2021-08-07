import type { FunctionComponent } from "react";
import React from "react";
import { Page } from "../Page";
import { AircraftTable } from "../../components/aircraft/AircraftTable";
import { CardSection } from "../../components/layouts/CardSection";

export const AircraftPage: FunctionComponent = () => {
    return (
        <Page title={"Aircraft"}>
            <CardSection title="Aircraft">
                <AircraftTable />
            </CardSection>
        </Page>
    );
};
