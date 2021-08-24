import type { FC, ReactElement } from "react";
import React, { useState } from "react";
import { CommonProps, Styles } from "react-select";
import AsyncSelect from "react-select/async";
import { ClearIcon } from "../../../icons/ClearIcon";
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
    option: SelectOption<T> | null;
    setOption: (option: SelectOption<T> | null) => void;
}

const DropdownIndicator: FC = () => {
    return (
        <div className={styles.dropdownIndicator}>
            <ExpandMoreIcon />
        </div>
    );
};

const ClearIndicator: FC<CommonProps<any, any>> = (props) => {
    return (
        <button className={styles.clearIndicator} onClick={props.clearValue} aria-label={"Clear"}>
            <ClearIcon />
        </button>
    );
};

export function Select<T>({ label, loadOptions, option, setOption }: SelectProps<T>): ReactElement {
    const [isFocused, setIsFocused] = useState(false);
    const collapsedLabel = isFocused || Boolean(option);

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
                    DropdownIndicator,
                    ClearIndicator,
                }}
                noOptionsMessage={({ inputValue }) =>
                    inputValue ? "No results" : "Search by name or code"
                }
                value={option}
                onChange={(option) => setOption(option)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                isClearable={true}
            />
        </label>
    );
}
