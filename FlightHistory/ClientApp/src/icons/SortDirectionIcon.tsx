import type { FunctionComponent } from "react";
import React from "react";
import { Svg } from "../wrappers/StyledWrappers";
import * as styles from "./icons.styles";

// https://fonts.google.com/icons?selected=Material%20Icons%20Round%3Aexpand_less%3A
export const SortDirectionIcon: FunctionComponent = () => {
    return (
        <Svg css={styles.icon} viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z" />
        </Svg>
    );
};
