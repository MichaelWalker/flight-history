import { css } from "@emotion/css";
import type { FC } from "react";
import React from "react";
import { TransitionStatus } from "react-transition-group";
import { TRANSITIONS } from "../styles/constants.styles";
import { Transition } from "./Transition";

export interface FadeProps {
    isRendered: boolean;
}

export const Fade: FC<FadeProps> = ({ isRendered, children }) => {
    function styles(transitionStatus: TransitionStatus): string {
        console.log("re-rendering", transitionStatus);
        switch (transitionStatus) {
            case "unmounted":
                return css`
                    opacity: 0;
                    background: yellow;
                `;
            case "entering":
                return css`
                    transition: all ease ${TRANSITIONS.DEFAULT};
                    opacity: 1;
                    background: red;
                `;
            case "entered":
                return css`
                    opacity: 1;
                    background: blue;
                `;
            case "exiting":
                return css`
                    transition: all ease ${TRANSITIONS.DEFAULT};
                    opacity: 0;
                    background: green;
                `;
            case "exited":
                return css`
                    opacity: 0;
                    background: orange;
                `;
        }
    }

    return (
        <Transition isRendered={isRendered} styles={styles}>
            {children}
        </Transition>
    );
};
