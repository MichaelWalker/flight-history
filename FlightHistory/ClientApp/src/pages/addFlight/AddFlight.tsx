import type { FC } from "react";
import React from "react";
import { AddFlightForm } from "../../components/flights/addFlightForm/AddFlightForm";
import { useModal } from "../../hooks/useModal";
import { Page } from "../Page";

export const AddFlight: FC = () => {
    const { openModal, renderInModal } = useModal();

    return (
        <Page title={"Add Flight"}>
            <AddFlightForm />
            <button onClick={openModal}>Modal!!!</button>
            {renderInModal(<div>Hello World!</div>)}
        </Page>
    );
};
