import type { FC } from "react";
import React, { useState } from "react";
import { AirportStubs } from "../../../api/stub/airportStubs";
import { Airport } from "../../../models/airport";
import { stubAirport, stubAirport2 } from "../../../models/airport.testdata";
import { AirportSelect } from "../../forms/select/airportSelect/AirportSelect";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

export const AddFlightForm: FC = () => {
    const [source, setSource] = useState<Airport | null>(stubAirport);
    const [destination, setDestination] = useState<Airport | null>(stubAirport2);

    return (
        <CardSection title={"Add Flight"} className={styles.addFlightSection}>
            <form>
                <AirportSelect label="Source Airport" value={source} setValue={setSource} />
                <AirportSelect
                    label="Destination Airport"
                    value={destination}
                    setValue={setDestination}
                />
            </form>
        </CardSection>
    );
};
