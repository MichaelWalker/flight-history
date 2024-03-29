﻿import type { FunctionComponent } from "react";
import React from "react";
import * as styles from "./icons.styles";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Aplace%3A
export const AirportIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <g>
                <rect fill="none" height="24" width="24" y="0" />
            </g>
            <g>
                <path d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.18,2.45,6.92,7.34,11.23c0.38,0.33,0.95,0.33,1.33,0 C17.55,17.12,20,13.38,20,10.2C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2 C14,11.1,13.1,12,12,12z" />
            </g>
        </svg>
    );
};
