﻿import type { FunctionComponent } from "react";
import React from "react";
import * as styles from "./icons.styles";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Adashboard%3A
export const DashboardIcon: FunctionComponent = () => {
    return (
        <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
    );
};
