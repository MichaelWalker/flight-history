import React, { FC } from "react";
import { FormField } from "../formField/FormField";
import { FormFieldProps } from "../useFormField/useFormField";
import * as styles from "./input.styles";

interface InputProps extends FormFieldProps<string> {
    type: "date";
}

export const Input: FC<InputProps> = (props) => {
    const { type, value, onChange, onFocus, onBlur } = props;

    return (
        <FormField {...props}>
            <input
                className={styles.input}
                type={type}
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onFocus} // Cover for FF issue where date input fails to focus as expected.
            />
        </FormField>
    );
};
