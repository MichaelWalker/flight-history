import type { ReactElement } from "react";
import React from "react";
import AsyncSelect from "react-select/async";
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
        <label>
            <span className={styles.label}>{label}</span>
            <AsyncSelect loadOptions={loadOptions} />
        </label>
    );
}
