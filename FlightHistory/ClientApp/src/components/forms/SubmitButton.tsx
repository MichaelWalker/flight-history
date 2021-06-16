import type { FunctionComponent } from "react";
import React from "react";
import styles from "./SubmitButton.module.scss";
import type { FormState } from "./Form";
import { SuccessIcon } from "../SuccessIcon";
import { LoadingAnimation } from "../../icons/loadingAnimation/LoadingAnimation";

interface SubmitButtonProps {
    state: FormState<unknown>;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ state, children }) => {
    function content() {
        if (state.status === "SUBMITTING") {
            return <LoadingAnimation size={"SMALL"} />;
        }

        if (state.status === "SUCCESS") {
            return <SuccessIcon />;
        }

        return children;
    }

    function disabled() {
        return ["INCOMPLETE", "SUBMITTING", "SUCCESS"].includes(state.status);
    }

    return (
        <button className={styles.button} type={"submit"} disabled={disabled()}>
            {content()}
        </button>
    );
};
