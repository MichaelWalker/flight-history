import type { FC } from "react";
import React from "react";
import { AddFlightForm } from "../../components/flights/addFlightForm/AddFlightForm";
import { Page } from "../Page";

export const AddFlight: FC = () => {
    return (
        <Page title={"Add Flight"}>
            <AddFlightForm />
        </Page>
    );
};
