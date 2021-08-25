import { useState } from "react";

export interface FormField<T> {
    label: string;
    value: T | null;
    setValue: (value: T | null) => void;
    validate: () => T | null;
    validationError: string | null;
}

interface FieldOptions<T> {
    initialValue?: T | null;
}

interface FieldProps<T> {
    label: string;
    options?: FieldOptions<T>;
}

export function useField<T>(label: string, options: FieldOptions<T> = {}): FormField<T> {
    const { initialValue = null } = options;

    const [value, setValue] = useState(initialValue);
    const [validationError, setValidationError] = useState<string | null>(null);

    function validate(): T | null {
        return value;
    }

    return {
        label,
        value,
        setValue,
        validate,
        validationError,
    };
}
