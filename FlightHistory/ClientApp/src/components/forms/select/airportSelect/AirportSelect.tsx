import React, { FC } from "react";
import { AirportsClient } from "../../../../api/airportsClient";
import { Airport } from "../../../../models/airport";
import { Select, SelectOption } from "../Select";

interface AirportSelectProps {
    label: string;
    value: Airport | null;
    setValue: (airport: Airport | null) => void;
}

function toOption(airport: Airport | null): SelectOption<Airport> | null {
    if (!airport) {
        return null;
    }
    return { label: airport.name, value: airport };
}

function fromOption(option: SelectOption<Airport> | null): Airport | null {
    return option ? option.value : null;
}

async function getAirportOptions(searchInput: string): Promise<SelectOption<Airport>[]> {
    return (await AirportsClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (airport) => {
            return { label: airport.name, value: airport };
        },
    );
}

export const AirportSelect: FC<AirportSelectProps> = ({ label, value, setValue }) => {
    return (
        <Select
            label={label}
            option={toOption(value)}
            setOption={(option) => setValue(fromOption(option))}
            loadOptions={getAirportOptions}
        />
    );
};
