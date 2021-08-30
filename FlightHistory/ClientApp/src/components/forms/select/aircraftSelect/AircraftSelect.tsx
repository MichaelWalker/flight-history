import React, { FC } from "react";
import { AircraftClient } from "../../../../api/aircraftClient";
import { Aircraft } from "../../../../models/aircraft";
import { FormField } from "../../useFormField/useFormField";
import { Select, SelectOption } from "../Select";

async function getAircraftOptions(searchInput: string): Promise<SelectOption<Aircraft>[]> {
    return (await AircraftClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (aircraft) => {
            return { label: aircraft.registration, value: aircraft };
        },
    );
}

export const AircraftSelect: FC<FormField<Aircraft>> = (props) => {
    return (
        <Select
            {...props}
            loadOptions={getAircraftOptions}
            toOptionLabel={(aircraft) => aircraft.registration}
            helpText={"Search by aircraft registration or model"}
        />
    );
};
