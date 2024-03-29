import type { FunctionComponent } from "react";
import React from "react";
import type { IconSize } from "./loadingAnimation.styles";
import * as styles from "./loadingAnimation.styles";

interface LoadingAnimationProps {
    size: IconSize;
}

export const LoadingAnimation: FunctionComponent<LoadingAnimationProps> = ({ size }) => {
    return (
        <svg
            className={styles.loadingAnimation(size)}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            data-testid={"loading-animation"}
        >
            <circle
                className={styles.outerCircle}
                cx="50"
                cy="50"
                r="32"
                strokeDasharray="50.26548245743669 50.26548245743669"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                />
            </circle>
            <circle
                className={styles.innerCircle}
                cx="50"
                cy="50"
                r="26"
                strokeDasharray="40.840704496667314 40.840704496667314"
                strokeDashoffset="40.840704496667314"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 50;-360 50 50"
                />
            </circle>
        </svg>
    );
};
