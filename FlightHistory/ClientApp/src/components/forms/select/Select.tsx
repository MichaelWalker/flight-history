import type { FC, ReactElement } from "react";
import React, { useState } from "react";
import { Styles } from "react-select";
import AsyncSelect from "react-select/async";
import { ExpandMoreIcon } from "../../../icons/ExpandMoreIcon";
import * as styles from "./select.styles";

export interface SelectOption<T> {
    label: string;
    value: T;
}

export type LoadOptions<T> = (search: string) => Promise<SelectOption<T>[]>;

interface SelectProps<T> {
    label: string;
    loadOptions: LoadOptions<T>;
    value: T | null;
    setValue: (value: T | null) => void;
}

const DropdownIndicator: FC = () => {
    return (
        <div className={styles.dropdownIndicator}>
            <ExpandMoreIcon />
        </div>
    );
};

export function Select<T>({ label, loadOptions, value, setValue }: SelectProps<T>): ReactElement {
    const [isFocused, setIsFocused] = useState(false);
    const collapsedLabel = isFocused || Boolean(value);

    const selectStyles: Styles<SelectOption<T>, false, any> = {
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
        <label className={styles.selectContainer}>
            <span className={styles.label(collapsedLabel, isFocused)}>{label}</span>
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
                onChange={(newValue: SelectOption<T>) => setValue(newValue.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </label>
    );
}
