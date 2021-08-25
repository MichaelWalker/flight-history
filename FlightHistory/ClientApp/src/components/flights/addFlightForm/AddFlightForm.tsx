import type { FC } from "react";
import React from "react";
import { Aircraft } from "../../../models/aircraft";
import { Airline } from "../../../models/airline";
import { Airport } from "../../../models/airport";
import { AircraftSelect } from "../../forms/select/aircraftSelect/AircraftSelect";
import { AirlineSelect } from "../../forms/select/airlineSelect/AirlineSelect";
import { AirportSelect } from "../../forms/select/airportSelect/AirportSelect";
import { useForm } from "../../forms/useForm/useForm";
import { useField, useRequiredField } from "../../forms/useFormField/useFormField";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

interface Foo {
    source: Airport;
    destination: Airport;
    airline: Airline;
    aircraft: Aircraft;
}

export const AddFlightForm: FC = () => {
    const sourceField = useRequiredField<Airport>("Source Airport");
    const destinationField = useRequiredField<Airport>("Destination Airport");
    const airlineField = useRequiredField<Airline>("Airline");
    const aircraftField = useRequiredField<Aircraft>("Aircraft");

    const { onSubmit } = useForm<Foo>(
        {
            source: { ...sourceField },
            destination: { ...destinationField },
            airline: { ...airlineField },
            aircraft: { ...aircraftField },
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
                <AirlineSelect {...airlineField} />
                <AircraftSelect {...aircraftField} />
                <button type="submit">Click Me</button>
            </form>
        </CardSection>
    );
};
