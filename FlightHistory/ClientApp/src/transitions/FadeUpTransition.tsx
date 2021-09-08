import { css } from "@emotion/css";
import type { FC } from "react";
import React from "react";
import { TransitionStatus } from "react-transition-group";
import { SPACING, TRANSITIONS } from "../styles/constants.styles";
import { Transition } from "./Transition";

export interface FadeProps {
    isRendered: boolean;
}

export const FadeUpTransition: FC<FadeProps> = ({ isRendered, children }) => {
    function styles(transitionStatus: TransitionStatus): string {
        switch (transitionStatus) {
            case "unmounted":
                return css`
                    transform: translateY(${SPACING.LARGE});
                `;
            case "entering":
                return css`
                    transition: all ease ${TRANSITIONS.DEFAULT};
                `;
            case "entered":
                return css``;
            case "exiting":
                return css`
                    transition: all ease ${TRANSITIONS.DEFAULT};
                    transform: translateY(${SPACING.LARGE});
                `;
            case "exited":
                return css`
                    transform: translateY(${SPACING.LARGE});
                `;
        }
    }

    return (
        <Transition isRendered={isRendered} styles={styles}>
            {children}
        </Transition>
    );
};
