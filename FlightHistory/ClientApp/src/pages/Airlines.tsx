import React, {FunctionComponent} from "react";
import {Page} from "./Page";
import {AirlinesTable} from "../components/airlines/AirlinesTable";

export const AirlinesPage: FunctionComponent = () => {
    return (
        <Page title={"Airlines"}>
            <AirlinesTable/>
        </Page>
    );
};