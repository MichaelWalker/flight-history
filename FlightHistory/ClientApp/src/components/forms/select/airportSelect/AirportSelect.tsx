import React, { FC } from "react";
import { AirportsClient } from "../../../../api/airportsClient";
import { Airport } from "../../../../models/airport";
import { Select, SelectOption } from "../Select";

interface AirportSelectProps {
    label: string;
}

async function getAirportOptions(searchInput: string): Promise<SelectOption<Airport>[]> {
    return (await AirportsClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (airport) => {
            return { label: airport.name, value: airport };
        },
    );
}

export const AirportSelect: FC<AirportSelectProps> = ({ label }) => {
    return <Select label={label} loadOptions={getAirportOptions} />;
};
