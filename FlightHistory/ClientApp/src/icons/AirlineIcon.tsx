﻿import type { FunctionComponent } from "react";
import React from "react";
import * as styles from "./icons.styles";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Aairlines%3A
export const AirlineIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <rect fill="none" height="24" width="24" y="0" />
            <path d="M19.59,4h-5.01c-0.99,0-1.91,0.49-2.47,1.3L2,20h17l2.56-13.63C21.79,5.14,20.84,4,19.59,4z M14.5,14 c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5C17,12.88,15.88,14,14.5,14z" />
        </svg>
    );
};
