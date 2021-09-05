import type { FC } from "react";
import React from "react";
import { CSSTransition, SwitchTransition, TransitionStatus } from "react-transition-group";
import { DEFAULT_TRANSITION_TIME } from "../styles/constants.styles";

export interface TransitionProps {
    isRendered: boolean;
    styles: (transitionStatus: TransitionStatus) => string;
}

export const Transition: FC<TransitionProps> = ({ isRendered, styles, children }) => {
    return (
        // <SwitchTransition mode={"out-in"}>
        <CSSTransition
            in={isRendered}
            timeout={DEFAULT_TRANSITION_TIME}
            appear={true}
            unmountOnExit={true}
        >
            {(transitionStatus) => <div className={styles(transitionStatus)}>{children}</div>}
        </CSSTransition>
        // </SwitchTransition>
    );
};
