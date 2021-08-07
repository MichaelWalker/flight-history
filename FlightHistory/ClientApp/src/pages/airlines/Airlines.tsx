import type { FunctionComponent } from "react";
import React from "react";
import { Page } from "../Page";
import { AirlinesTable } from "../../components/airlines/AirlinesTable";
import { CardSection } from "../../components/layouts/CardSection";

export const AirlinesPage: FunctionComponent = () => {
    return (
        <Page title={"Airlines"}>
            <CardSection title="Airlines">
                <AirlinesTable />
            </CardSection>
        </Page>
    );
};
