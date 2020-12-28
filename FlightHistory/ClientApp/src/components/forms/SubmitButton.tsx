import React, {FunctionComponent} from "react";
import styles from "./SubmitButton.module.scss";
import {Loading} from "../Loading";

export type SubmitButtonState = 'DISABLED' | 'SUBMITTING' | 'READY';

interface SubmitButtonProps {
    state: SubmitButtonState;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({state, children}) => {
    const content = state === 'SUBMITTING' ? <Loading/> : children;
    return (
        <button className={styles.button} type={"submit"} disabled={state !== 'READY'}>{content}</button>
    );
};
