import type { FC, ReactElement } from "react";
import React, { useState } from "react";
import { CommonProps, Styles } from "react-select";
import AsyncSelect from "react-select/async";
import { ClearIcon } from "../../../icons/ClearIcon";
import { ExpandMoreIcon } from "../../../icons/ExpandMoreIcon";
import { FormField } from "../useFormField/useFormField";
import * as styles from "./select.styles";

export interface SelectOption<T> {
    label: string;
    value: T;
}

export type LoadOptions<T> = (search: string) => Promise<SelectOption<T>[]>;

interface SelectProps<T> extends FormField<T> {
    loadOptions: LoadOptions<T>;
    toOptionLabel: (item: T) => string;
    helpText: string;
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

function toOption<T>(item: T | null, getOptionLabel: (item: T) => string): SelectOption<T> | null {
    if (!item) {
        return null;
    }
    return { label: getOptionLabel(item), value: item };
}

function fromOption<T>(option: SelectOption<T> | null): T | null {
    return option ? option.value : null;
}

export function Select<T>({
    label,
    loadOptions,
    value,
    onChange,
    toOptionLabel,
    helpText,
    validationError,
    isFocused,
    isLabelCollapsed,
    onFocus,
    onBlur,
}: SelectProps<T>): ReactElement {
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
            <span className={styles.selectLabel(isLabelCollapsed, isFocused)}>{label}</span>
            <AsyncSelect
                loadOptions={loadOptions}
                styles={selectStyles}
                placeholder=""
                components={{
                    DropdownIndicator,
                    ClearIndicator,
                }}
                noOptionsMessage={({ inputValue }) => (inputValue ? "No results" : helpText)}
                value={toOption(value, toOptionLabel)}
                onChange={(option) => onChange(fromOption(option))}
                onFocus={onFocus}
                onBlur={onBlur}
                isClearable={true}
            />
            {validationError && (
                <span className={styles.selectValidationError}>{validationError}</span>
            )}
        </label>
    );
}
