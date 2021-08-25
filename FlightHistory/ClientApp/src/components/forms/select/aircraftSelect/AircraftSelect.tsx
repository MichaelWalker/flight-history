import React, { FC } from "react";
import { AircraftClient } from "../../../../api/aircraftClient";
import { Aircraft } from "../../../../models/aircraft";
import { Select, SelectOption } from "../Select";

interface AircraftSelectProps {
    label: string;
    value: Aircraft | null;
    setValue: (airport: Aircraft | null) => void;
}

async function getAircraftOptions(searchInput: string): Promise<SelectOption<Aircraft>[]> {
    return (await AircraftClient.list({ page: 1, pageSize: 5 }, undefined, searchInput)).items.map(
        (aircraft) => {
            return { label: aircraft.registration, value: aircraft };
        },
    );
}

export const AircraftSelect: FC<AircraftSelectProps> = ({ label, value, setValue }) => {
    return (
        <Select
            label={label}
            value={value}
            setValue={setValue}
            loadOptions={getAircraftOptions}
            toOptionLabel={(aircraft) => aircraft.registration}
            helpText={"Search by aircraft registration or model"}
        />
    );
};
