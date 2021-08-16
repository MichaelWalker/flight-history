import { css } from "@emotion/css";
import { COLOURS } from "../../styles/colours.styles";
import { SPACING, TRANSITIONS } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";

export const errorMessage = css`
    ${font(FONTS.DEFAULT)}
    padding: ${SPACING.SMALL};
    position: absolute;
    bottom: 0;
    right: 0;
    background: ${COLOURS.BACKGROUND};
    border-radius: 8px;
    border: 1px solid ${COLOURS.PRIMARY};
    opacity: 0;
    transition: all ease ${TRANSITIONS.DEFAULT};
    transform: scale(0.7);
`;

export const messageEnter = css`
    opacity: 1;
    transform: scale(1) translate(${SPACING.MEDIUM}, ${SPACING.MEDIUM});
`;

export const messageExit = css`
    opacity: 0;
    transform: scale(0.7) translate(0, 0);
`;
