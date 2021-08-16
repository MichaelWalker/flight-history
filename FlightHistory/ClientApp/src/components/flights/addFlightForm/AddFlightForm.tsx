import type { FC } from "react";
import React from "react";
import { Airport } from "../../../models/airport";
import { stubAirportList } from "../../../models/airport.testdata";
import { Form } from "../../../wrappers/StyledWrappers";
import { Select, SelectOption } from "../../forms/select/Select";
import { CardSection } from "../../layouts/CardSection";
import * as styles from "./addFlightForm.styles";

const options = stubAirportList.map((airport) => {
    return {
        label: airport.name,
        value: airport,
    };
});

function getOptions(search: string): Promise<SelectOption<Airport>[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                options.filter((airport) =>
                    airport.label.toLowerCase().includes(search.toLowerCase()),
                ),
            );
        }, 500);
    });
}

export const AddFlightForm: FC = () => {
    return (
        <CardSection title={"Add Flight"} css={styles.addFlightSection}>
            <Form>
                <Select loadOptions={getOptions} />
            </Form>
        </CardSection>
    );
};
