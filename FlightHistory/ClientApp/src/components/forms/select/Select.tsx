import React, { FC, ReactElement } from "react";
import ReactSelect from "react-select";

interface Option<T> {
    label: string;
    value: T;
}

interface SelectProps<T> {
    options: Option<T>[];
}

export function Select<T>({ options }: SelectProps<T>): ReactElement {
    return <ReactSelect options={options} />;
}
