import type { FC } from "react";
import React from "react";
import { Form } from "../../../wrappers/StyledWrappers";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

export const AddFlightForm: FC = () => {
    return (
        <CardSection title={"Add Flight"}>
            <Form />
        </CardSection>
    );
};
