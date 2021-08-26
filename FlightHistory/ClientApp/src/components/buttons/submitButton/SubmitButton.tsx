import React, { FC } from "react";
import { LoadingAnimation } from "../../../icons/loadingAnimation/LoadingAnimation";
import { FormSubmitState } from "../../forms/useForm/useForm";
import * as styles from "../button.styles";

interface SubmitButtonProps {
    status: FormSubmitState;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ status, children }) => {
    function getContents() {
        if (status === "SUBMITTING") {
            return <LoadingAnimation size={"SMALL"} />;
        }

        return children;
    }

    return (
        <button type="submit" className={styles.primaryButton}>
            {getContents()}
        </button>
    );
};
