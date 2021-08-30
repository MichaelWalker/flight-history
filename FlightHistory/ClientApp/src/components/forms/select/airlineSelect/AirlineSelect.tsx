import React, { FC } from "react";
import { AirlineClient } from "../../../../api/airlineClient";
import { Airline } from "../../../../models/airline";
import { FormField } from "../../useFormField/useFormField";
import { Select, SelectOption } from "../Select";

async function getAirlineOptions(searchInput: string): Promise<SelectOption<Airline>[]> {
    return (await AirlineClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (airline) => {
            return { label: airline.name, value: airline };
        },
    );
}

export const AirlineSelect: FC<FormField<Airline>> = (props) => {
    return (
        <Select
            {...props}
            loadOptions={getAirlineOptions}
            toOptionLabel={(airline) => airline.name}
            helpText={"Search by airline name"}
        />
    );
};
