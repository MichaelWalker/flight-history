import type { FC, ReactElement } from "react";
import React from "react";
import { Styles } from "react-select";
import AsyncSelect from "react-select/async";
import { ExpandMoreIcon } from "../../../icons/ExpandMoreIcon";
import * as styles from "./select.styles";

export interface SelectOption<T> {
    label: string;
    value: T;
}

interface SelectProps<T> {
    label: string;
    loadOptions: (search: string) => Promise<SelectOption<T>[]>;
}

const DropdownIndicator: FC = () => {
    return (
        <div className={styles.dropdownIndicator}>
            <ExpandMoreIcon />
        </div>
    );
};

export function Select<T>({ label, loadOptions }: SelectProps<T>): ReactElement {
    const selectStyles: Styles<T, false, any> = {
        control: styles.control,
        indicatorSeparator: styles.indicatorSeparator,
        input: styles.input,
        loadingMessage: styles.loadingMessage,
        noOptionsMessage: styles.noOptionsMessage,
        option: styles.option,
        singleValue: styles.singleValue,
        valueContainer: styles.valueContainer,
    };

    return (
        <label>
            <span className={styles.label}>{label}</span>
            <AsyncSelect
                loadOptions={loadOptions}
                styles={selectStyles}
                placeholder=""
                components={{
                    DropdownIndicator: DropdownIndicator,
                }}
                noOptionsMessage={({ inputValue }) =>
                    inputValue ? "No results" : "Search by name or code"
                }
            />
        </label>
    );
}
