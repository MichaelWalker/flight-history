import { css } from "@emotion/css";
import { COLOURS } from "../styles/colours.styles";
import { TRANSITIONS } from "../styles/constants.styles";

export const icon = css`
    height: 100%;
    width: auto;
    fill: ${COLOURS.FOREGROUND};
    transition: all ease ${TRANSITIONS.DEFAULT};
`;
