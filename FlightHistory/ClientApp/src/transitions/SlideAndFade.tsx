import type { FC } from "react";
import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { DEFAULT_TRANSITION_TIME } from "../styles/constants.styles";
import { slideAndFade } from "./SlideAndFade.styles";
import { Div } from "../wrappers/StyledElements";

export interface SlideAndFadeProps {
    stateKey: string;
}

export const SlideAndFade: FC<SlideAndFadeProps> = ({ stateKey, children }) => {
    return (
        <Div css={slideAndFade}>
            <SwitchTransition mode={"out-in"}>
                <CSSTransition
                    key={stateKey}
                    timeout={DEFAULT_TRANSITION_TIME}
                    classNames={"slide-and-fade"}
                >
                    {children}
                </CSSTransition>
            </SwitchTransition>
        </Div>
    );
};
