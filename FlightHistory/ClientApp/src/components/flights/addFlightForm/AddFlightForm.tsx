import type { FC } from "react";
import React, { useState } from "react";
import { AirportStubs } from "../../../api/stub/airportStubs";
import { Airport } from "../../../models/airport";
import { stubAirport, stubAirport2 } from "../../../models/airport.testdata";
import { Flight } from "../../../models/flight";
import { AirportSelect } from "../../forms/select/airportSelect/AirportSelect";
import { useForm } from "../../forms/useForm/useForm";
import { useField } from "../../forms/useFormField/useFormField";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

interface Foo {
    source: Airport | null;
    destination: Airport | null;
}

export const AddFlightForm: FC = () => {
    const sourceField = useField<Airport | null>("Source Airport");
    const destinationField = useField<Airport | null>("Destination Airport");

    const { onSubmit } = useForm<Foo>(
        {
            source: { ...sourceField },
            destination: { ...destinationField },
        },
        (foo) => {
            console.log("submitting", foo);
        },
    );

    return (
        <CardSection title={"Add Flight"} className={styles.addFlightSection}>
            <form onSubmit={onSubmit}>
                <AirportSelect {...sourceField} />
                <AirportSelect {...destinationField} />
                <button type="submit">Click Me</button>
            </form>
        </CardSection>
    );
};
