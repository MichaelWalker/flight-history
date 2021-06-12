import React, { FunctionComponent } from "react";
import styles from "./LoadingAnimation.module.scss";

interface LoadingAnimationProps {
    size: "SMALL" | "LARGE";
}

export const LoadingAnimation: FunctionComponent<LoadingAnimationProps> = ({ size }) => {
    function sizeClass(): string {
        switch (size) {
            case "SMALL":
                return styles.small;
            case "LARGE":
                return styles.large;
        }
    }
    return (
        <svg
            className={`${styles.loadingAnimation} ${sizeClass()}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
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
