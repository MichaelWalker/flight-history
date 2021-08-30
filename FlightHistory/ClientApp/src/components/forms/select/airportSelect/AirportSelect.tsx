import React, { FC } from "react";
import { AirportsClient } from "../../../../api/airportsClient";
import { Airport } from "../../../../models/airport";
import { FormField } from "../../useFormField/useFormField";
import { Select, SelectOption } from "../Select";

async function getAirportOptions(searchInput: string): Promise<SelectOption<Airport>[]> {
    return (await AirportsClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (airport) => {
            return { label: airport.name, value: airport };
        },
    );
}

export const AirportSelect: FC<FormField<Airport>> = (props) => {
    return (
        <Select
            {...props}
            toOptionLabel={(airport) => airport.name}
            loadOptions={getAirportOptions}
            helpText={"Search by airport name or code"}
        />
    );
};
