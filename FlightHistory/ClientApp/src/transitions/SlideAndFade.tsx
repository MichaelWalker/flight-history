import type { FC } from "react";
import React from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styles from "./SlideAndFade.module.scss";

interface SlideAndFadeProps {
    stateKey: string;
}

export const SlideAndFade: FC<SlideAndFadeProps> = ({ stateKey, children }) => {
    return (
        <SwitchTransition mode={"out-in"}>
            <CSSTransition
                key={stateKey}
                timeout={200}
                classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    enterDone: styles.enterDone,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
                    exitDone: styles.exitDone,
                }}
            >
                {children}
            </CSSTransition>
        </SwitchTransition>
    );
};
