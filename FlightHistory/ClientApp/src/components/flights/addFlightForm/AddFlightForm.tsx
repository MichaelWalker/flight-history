import type { FC } from "react";
import React from "react";
import { Logger } from "../../../helpers/logger";
import { Aircraft } from "../../../models/aircraft";
import { Airline } from "../../../models/airline";
import { Airport } from "../../../models/airport";
import { CreateFlight } from "../../../models/flight";
import { FormButtons } from "../../forms/formButtons/FormButtons";
import { DateInput } from "../../forms/input/dateInput/DateInput";
import { AircraftSelect } from "../../forms/select/aircraftSelect/AircraftSelect";
import { AirlineSelect } from "../../forms/select/airlineSelect/AirlineSelect";
import { AirportSelect } from "../../forms/select/airportSelect/AirportSelect";
import { useForm } from "../../forms/useForm/useForm";
import { useRequiredFormField } from "../../forms/useFormField/useFormField";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

export const AddFlightForm: FC = () => {
    const sourceField = useRequiredFormField<Airport>("Source Airport");
    const destinationField = useRequiredFormField<Airport>("Destination Airport");
    const airlineField = useRequiredFormField<Airline>("Airline");
    const aircraftField = useRequiredFormField<Aircraft>("Aircraft");
    const dateField = useRequiredFormField<string>("Departure Date");

    const { onSubmit, state } = useForm<CreateFlight>(
        {
            source: { ...sourceField },
            destination: { ...destinationField },
            airline: { ...airlineField },
            aircraft: { ...aircraftField },
            date: { ...dateField },
        },
        (foo) => {
            Logger.info("submitting", foo);
        },
    );

    return (
        <CardSection title={"Add Flight"} className={styles.addFlightSection}>
            <form onSubmit={onSubmit}>
                <AirportSelect {...sourceField} />
                <AirportSelect {...destinationField} />
                <AirlineSelect {...airlineField} />
                <AircraftSelect {...aircraftField} />
                <DateInput {...dateField} />

                <FormButtons returnTo={"/flights"} formSubmitStatus={state} />
            </form>
        </CardSection>
    );
};
