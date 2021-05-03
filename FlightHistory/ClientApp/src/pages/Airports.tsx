import React, {FunctionComponent} from "react";
import {Page} from "./Page";
import {AirportsTable} from "../components/airports/AirportsTable";

export const AirportsPage: FunctionComponent = () => {
    return (
        <Page title={"Airports"}>
            <AirportsTable/>
        </Page>
    );
};