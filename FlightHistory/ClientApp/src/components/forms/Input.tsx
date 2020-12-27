import React, {FunctionComponent} from "react";

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

export const PasswordInput: FunctionComponent<TextInputProps> = ({children, value, updateValue, required}) => {
    return <Input type={"password"} value={value} updateValue={updateValue} required={required}>{children}</Input>;
}

export const EmailInput: FunctionComponent<TextInputProps> = ({children, value, updateValue, required}) => {
    return <Input type={"email"} value={value} updateValue={updateValue} required={required}>{children}</Input>;
};

const Input: FunctionComponent<InputProps> = ({children, type, value, updateValue, required = false}) => {
    return (
        <label>
            {children}
            <input type={type} value={value} onChange={event => updateValue(event.target.value)} required={required}/>
        </label>
    );
}