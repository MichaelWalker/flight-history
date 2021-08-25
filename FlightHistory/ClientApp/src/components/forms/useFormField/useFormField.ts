import { useState } from "react";

interface FormField<T> {
    label: string;
    value: T | null;
    setValue: (value: T | null) => void;
    validate: () => T | null;
    validationError: string | null;
}

interface RequiredFormField<T> extends FormField<T> {
    validate: () => T;
}

interface FieldOptions<T> {
    initialValue?: T | null;
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

export function useRequiredField<T>(
    label: string,
    options: FieldOptions<T> = {},
): RequiredFormField<T> {
    const field = useField(label, options);

    function validate(): T {
        if (field.value === null || (typeof field === "string" && field === "")) {
            throw Error("Cannot be null");
        }
        return field.value;
    }

    return {
        ...field,
        validate,
    };
}
