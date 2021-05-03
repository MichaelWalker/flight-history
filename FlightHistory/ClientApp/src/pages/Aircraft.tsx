import React, {FunctionComponent} from "react";
import {Page} from "./Page";
import {AircraftTable} from "../components/aircraft/AircraftTable";

export const AircraftPage: FunctionComponent = () => {
    return (
        <Page title={"Aircraft"}>
            <AircraftTable/>
        </Page>
    );
};