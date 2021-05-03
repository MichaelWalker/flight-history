import React, {FunctionComponent} from "react";
import {Page} from "./Page";
import {FlightsTable} from "../components/flights/FlightsTable";

export const FlightsPage: FunctionComponent = () => {
    return (
        <Page title={"Flights"}>
            <FlightsTable/>
        </Page>
    );
};
