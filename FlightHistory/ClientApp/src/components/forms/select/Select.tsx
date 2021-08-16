import React, { ReactElement } from "react";
import AsyncSelect from "react-select/async";
import { Label, Span } from "../../../wrappers/StyledWrappers";
import * as styles from "./select.styles";

export interface SelectOption<T> {
    label: string;
    value: T;
}

interface SelectProps<T> {
    label: string;
    loadOptions: (search: string) => Promise<SelectOption<T>[]>;
}

export function Select<T>({ label, loadOptions }: SelectProps<T>): ReactElement {
    return (
        <Label>
            <Span css={styles.label}>{label}</Span>
            <AsyncSelect loadOptions={loadOptions} />
        </Label>
    );
}
