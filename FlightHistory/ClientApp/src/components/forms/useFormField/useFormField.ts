import { useCallback, useState } from "react";
import { isNotNullOrEmpty } from "../../../helpers/utils";

export interface FormFieldProps<T> {
    label: string;
    value: T | null;
    onChange: (value: T | null) => void;
    onFocus: () => void;
    onBlur: () => void;
    validate: () => T | null;
    validationError: string | null;
    setValidationError: (message: string) => void;
    isLabelCollapsed: boolean;
    isFocused: boolean;
}

interface RequiredFormField<T> extends FormFieldProps<T> {
    validate: () => T;
}

interface FieldOptions<T> {
    initialValue?: T | null;
}

export function useFormField<T>(label: string, options: FieldOptions<T> = {}): FormFieldProps<T> {
    const { initialValue = null } = options;

    const [value, setValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const isLabelCollapsed = isFocused || isNotNullOrEmpty(value);

    const onChange = useCallback(
        (newValue: T | null) => {
            setValidationError(null);
            setValue(newValue);
        },
        [setValidationError, setValue],
    );

    const onFocus = useCallback(() => {
        setIsFocused(true);
    }, [setIsFocused]);

    const onBlur = useCallback(() => {
        setIsFocused(false);
    }, [setIsFocused]);

    const validate = useCallback((): T | null => {
        return value;
    }, [value]);

    return {
        label,
        value,
        onChange,
        onFocus,
        onBlur,
        validate,
        validationError,
        setValidationError,
        isLabelCollapsed,
        isFocused,
    };
}

export function useRequiredFormField<T>(
    label: string,
    options: FieldOptions<T> = {},
): RequiredFormField<T> {
    const field = useFormField(label, options);
    const { value, setValidationError } = field;

    const validate = useCallback((): T => {
        if (!isNotNullOrEmpty(value)) {
            setValidationError(`${label} is required`);
            throw Error("Cannot be null");
        }

        return value;
    }, [value, setValidationError]);

    return {
        ...field,
        validate,
    };
}
