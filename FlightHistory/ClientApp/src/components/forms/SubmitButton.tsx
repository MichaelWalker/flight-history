import React, {FunctionComponent} from "react";

export type SubmitButtonState = 'DISABLED' | 'SUBMITTING' | 'READY';

interface SubmitButtonProps {
    state: SubmitButtonState;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({state, children}) => {
    return (
        <button type={"submit"} disabled={state !== 'READY'}>{children}</button>
    );
};
