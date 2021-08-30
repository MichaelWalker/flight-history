import React, { FC, useState } from "react";
import { FormField } from "../useFormField/useFormField";
import * as styles from "../formField.styles";

interface InputProps extends FormField<string> {
    type: "date";
}

export const Input: FC<InputProps> = ({
    label,
    value,
    onChange,
    validationError,
    type,
    isLabelCollapsed,
    onFocus,
    onBlur,
    isFocused,
}) => {
    return (
        <label className={styles.fieldContainer}>
            <span className={styles.label(isLabelCollapsed, isFocused)}>{label}</span>
            <input
                className={styles.input(isLabelCollapsed)}
                type={type}
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onFocus} // Cover for FF issue where date input fails to focus as expected.
            />
            {/* TODO - Add some aria roles to this. */}
            {validationError && <span className={styles.validationError}>{validationError}</span>}
        </label>
    );
};
