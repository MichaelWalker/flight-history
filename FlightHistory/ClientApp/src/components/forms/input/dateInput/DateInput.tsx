import React, { FC } from "react";
import { Input } from "../Input";

interface DateInputProps {
    label: string;
    value: string | null;
    setValue: (value: string | null) => void;
}

export const DateInput: FC<DateInputProps> = (props) => {
    return <Input type="date" {...props} />;
};
