﻿import type { FunctionComponent } from "react";
import React from "react";
import * as styles from "./input.styles";

interface TextInputProps {
    value: string;
    updateValue: (value: string) => void;
    required?: boolean;
}

interface InputProps {
    type: string;
    value: string;
    updateValue: (value: string) => void;
    required?: boolean;
}

export const PasswordInput: FunctionComponent<TextInputProps> = ({
    children,
    value,
    updateValue,
    required,
}) => {
    return (
        <Input type={"password"} value={value} updateValue={updateValue} required={required}>
            {children}
        </Input>
    );
};

export const EmailInput: FunctionComponent<TextInputProps> = ({
    children,
    value,
    updateValue,
    required,
}) => {
    return (
        <Input type={"email"} value={value} updateValue={updateValue} required={required}>
            {children}
        </Input>
    );
};

const Input: FunctionComponent<InputProps> = ({
    children,
    type,
    value,
    updateValue,
    required = false,
}) => {
    return (
        <label className={styles.field}>
            <span className={styles.label}>{children}</span>
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={(event) => updateValue(event.target.value)}
                required={required}
            />
        </label>
    );
};
