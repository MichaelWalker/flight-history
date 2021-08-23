import type { FC } from "react";
import React from "react";
import { AirportSelect } from "../../forms/select/airportSelect/AirportSelect";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

export const AddFlightForm: FC = () => {
    return (
        <CardSection title={"Add Flight"} className={styles.addFlightSection}>
            <form>
                <AirportSelect label="Source Airport" />
                <AirportSelect label="Destination Airport" />
            </form>
        </CardSection>
    );
};
