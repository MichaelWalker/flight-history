import type { FunctionComponent } from "react";
import React from "react";
import { PrimaryLinkButton } from "../../components/buttons/linkButton/LinkButton";
import { Page } from "../Page";
import { FlightsTable } from "../../components/flights/FlightsTable";
import { CardSection } from "../../components/layouts/CardSection";

export const FlightsPage: FunctionComponent = () => {
    return (
        <Page title={"Flights"}>
            <CardSection
                title="Flights"
                actions={<PrimaryLinkButton to={"/flights/add"}>Add Flight</PrimaryLinkButton>}
            >
                <FlightsTable />
            </CardSection>
        </Page>
    );
};
