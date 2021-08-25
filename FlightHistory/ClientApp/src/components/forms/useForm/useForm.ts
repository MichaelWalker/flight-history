import { useState } from "react";
import type { FormEvent } from "react";

type FormState = "READY" | "SUBMITTING" | "ERROR" | "SUCCESS";

interface UseFormResponse<T> {
    state: FormState;
    onSubmit: (event: FormEvent) => void;
}

type FormValueFields<T> = {
    [Property in keyof T]: { validate: () => T[Property] };
};

function validateInput<T>(formFields: FormValueFields<T>): T {
    let hasErrors = false;
    const keys = Object.keys(formFields) as (keyof T)[];

    const entries: [keyof T, T[keyof T]][] = [];
    for (const key of keys) {
        try {
            entries.push([key, formFields[key].validate()]);
        } catch (_) {
            hasErrors = true;
        }
    }

    if (hasErrors) {
        throw new Error("Validation Exception");
    }

    return Object.fromEntries(entries) as unknown as T;
}

export function useForm<T>(
    formValues: FormValueFields<T>,
    submitCallback: (formValues: T) => void,
): UseFormResponse<T> {
    const [state, setState] = useState<FormState>("READY");

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        setState("SUBMITTING");

        try {
            const validatedValues = validateInput(formValues);
            submitCallback(validatedValues);
            setState("SUCCESS");
        } catch (e) {
            setState("ERROR");
        }
    }

    return { state, onSubmit };
}
