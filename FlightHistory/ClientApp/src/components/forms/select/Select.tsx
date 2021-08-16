import React, { FC, ReactElement } from "react";
import AsyncSelect from "react-select/async";

export interface SelectOption<T> {
    label: string;
    value: T;
}

interface SelectProps<T> {
    loadOptions: (search: string) => Promise<SelectOption<T>[]>;
}

export function Select<T>({ loadOptions }: SelectProps<T>): ReactElement {
    return <AsyncSelect loadOptions={loadOptions} />;
}
