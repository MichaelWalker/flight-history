import type { FC } from "react";
import React from "react";
import { stubAirportList } from "../../../models/airport.testdata";
import { Form } from "../../../wrappers/StyledWrappers";
import { Select } from "../../forms/select/Select";
import { CardSection } from "../../layouts/CardSection";

const options = stubAirportList.map((airport) => {
    return {
        label: airport.name,
        value: airport,
    };
});

export const AddFlightForm: FC = () => {
    return (
        <CardSection title={"Add Flight"}>
            <Form>
                <Select options={options} />
            </Form>
        </CardSection>
    );
};
