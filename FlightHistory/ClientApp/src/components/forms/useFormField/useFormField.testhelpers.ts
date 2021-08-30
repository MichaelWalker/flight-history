import { FormField } from "./useFormField";

export interface StubFormFieldOptions {
    value?: string;
    onChange?: (newValue: string) => void;
    isFocused?: boolean;
}

export function stubFormField(options: StubFormFieldOptions = {}): FormField<string> {
    const value = options.value ?? "";
    return {
        label: "Label",
        value: value,
        onChange: options.onChange ?? jest.fn,
        onFocus: () => {},
        onBlur: () => {},
        validate: () => value,
        validationError: null,
        setValidationError: () => {},
        isLabelCollapsed: false,
        isFocused: options.isFocused || false,
    };
}
