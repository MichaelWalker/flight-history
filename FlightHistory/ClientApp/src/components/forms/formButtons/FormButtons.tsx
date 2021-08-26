import React, { FC } from "react";
import { SecondaryLinkButton } from "../../buttons/linkButton/LinkButton";
import { SubmitButton } from "../../buttons/submitButton/SubmitButton";
import { FormSubmitState } from "../useForm/useForm";
import * as styles from "./formButtons.styles";

interface FormButtonsProps {
    returnTo: string;
    formSubmitStatus: FormSubmitState;
}

export const FormButtons: FC<FormButtonsProps> = ({ returnTo, formSubmitStatus }) => {
    return (
        <div className={styles.buttonRow}>
            <SecondaryLinkButton to={returnTo}>Back</SecondaryLinkButton>
            <SubmitButton status={formSubmitStatus}>Submit</SubmitButton>
        </div>
    );
};
