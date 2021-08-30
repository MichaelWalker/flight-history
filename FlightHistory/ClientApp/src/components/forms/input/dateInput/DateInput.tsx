import React, { FC } from "react";
import { FormField } from "../../useFormField/useFormField";
import { Input } from "../Input";

export const DateInput: FC<FormField<string>> = (props) => {
    return <Input type="date" {...props} />;
};
