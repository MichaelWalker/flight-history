import React, {FunctionComponent} from "react";
import styles from "./SubmitButton.module.scss";
import {Loading} from "../Loading";
import {FormState} from "./Form";
import {SuccessIcon} from "../SuccessIcon";

interface SubmitButtonProps {
    state: FormState<unknown>;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({state, children}) => {
    function content() {
        if (state.status === 'SUBMITTING') {
            return <Loading/>;
        }
        
        if (state.status === 'SUCCESS') {
            return <SuccessIcon/>;
        }
        
        return children;
    }
    
    function disabled() {
        return ['INCOMPLETE', 'SUBMITTING', 'SUCCESS'].includes(state.status);
    }
    
    return (
        <button className={styles.button} type={"submit"} disabled={disabled()}>{content()}</button>
    );
};
