import { css } from "@emotion/css";
import { COLOURS } from "../../styles/colours.styles";
import { SPACING, TRANSITIONS } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";

export const field = css`
    display: block;
    position: relative;
    margin-bottom: ${SPACING.MEDIUM};
    border: 1px solid ${COLOURS.FOREGROUND};
    border-radius: 8px;
    transition: border-color ease ${TRANSITIONS.DEFAULT};

    &:focus-within {
        border-color: ${COLOURS.PRIMARY};
    }
`;

export const label = css`
    ${font(FONTS.DEFAULT)}
    position: absolute;
    left: ${SPACING.SMALL};
    top: -${FONTS.DEFAULT.lineHeight / 2};
    background: ${COLOURS.BACKGROUND};
    padding: 0 ${SPACING.SMALL};
`;

export const input = css`
    ${font(FONTS.DEFAULT)}
    background: none;
    outline: none;
    border: none;
    width: 400px;
    padding: ${SPACING.SMALL};
`;
