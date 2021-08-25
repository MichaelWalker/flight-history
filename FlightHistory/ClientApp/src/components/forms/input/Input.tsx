import React, { FC, useState } from "react";
import * as styles from "./input.styles";

interface InputProps {
    label: string;
    value: string | null;
    setValue: (value: string | null) => void;
    type: "date";
}

export const Input: FC<InputProps> = ({ label, value, setValue, type }) => {
    const [isFocused, setIsFocused] = useState(false);

    function labelIsCollapsed() {
        if (isFocused) {
            return true;
        }

        return value !== null && value.trim() !== "";
    }

    return (
        <label className={styles.container}>
            <span className={styles.inputLabel(labelIsCollapsed(), isFocused)}>{label}</span>
            <input
                className={styles.input(labelIsCollapsed())}
                type={type}
                value={value ?? ""}
                onChange={(event) => setValue(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </label>
    );
};
