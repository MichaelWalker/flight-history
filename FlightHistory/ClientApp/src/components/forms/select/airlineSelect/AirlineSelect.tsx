import React, { FC } from "react";
import { AirlineClient } from "../../../../api/airlineClient";
import { AirportsClient } from "../../../../api/airportsClient";
import { Airline } from "../../../../models/airline";
import { Select, SelectOption } from "../Select";

interface AirlineSelectProps {
    label: string;
    value: Airline | null;
    setValue: (airport: Airline | null) => void;
}

async function getAirlineOptions(searchInput: string): Promise<SelectOption<Airline>[]> {
    return (await AirlineClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (airline) => {
            return { label: airline.name, value: airline };
        },
    );
}

export const AirlineSelect: FC<AirlineSelectProps> = ({ label, value, setValue }) => {
    return (
        <Select
            label={label}
            value={value}
            setValue={setValue}
            loadOptions={getAirlineOptions}
            toOptionLabel={(airline) => airline.name}
        />
    );
};
