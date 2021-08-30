import React, { FC } from "react";
import { FormFieldProps } from "../../useFormField/useFormField";
import { Input } from "../Input";

export const DateInput: FC<FormFieldProps<string>> = (props) => {
    return <Input type="date" {...props} />;
};
