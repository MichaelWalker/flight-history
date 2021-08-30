import React, { FC } from "react";
import { FormFieldProps } from "../useFormField/useFormField";
import * as styles from "./formField.styles";

export const FormField: FC<FormFieldProps<unknown>> = (props) => {
    return (
        <label className={styles.field(props.isFocused, props.validationError)}>
            <span
                className={styles.label(
                    props.isFocused,
                    props.isLabelCollapsed,
                    props.validationError,
                )}
            >
                {props.label}
            </span>
            <div className={styles.inputContainer(props.isLabelCollapsed)}>{props.children}</div>
            {props.validationError && (
                <span className={styles.validationError}>{props.validationError}</span>
            )}
        </label>
    );
};
