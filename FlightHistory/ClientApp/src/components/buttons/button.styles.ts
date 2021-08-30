import { css } from "@emotion/css";
import { COLOUR_PALETTES, COLOURS, setColourPalette } from "../../styles/colours.styles";
import { SPACING, TRANSITIONS } from "../../styles/constants.styles";
import { font, FONTS } from "../../styles/fonts.styles";
import { focusable } from "../../styles/mixins.styles";

const button = css`
    ${font(FONTS.BUTTON)}
    ${focusable()}
    padding: 0 ${SPACING.MEDIUM};
    background: ${COLOURS.BACKGROUND};
    transition: all ease ${TRANSITIONS.DEFAULT};
    display: inline-block;
`;

export const primaryButton = css`
    ${button}
    ${setColourPalette(COLOUR_PALETTES.PRIMARY)}
  
    &:hover, &:focus-within &:active {
        ${setColourPalette(COLOUR_PALETTES.PRIMARY_ACTIVE)}
    }
`;

export const secondaryButton = css`
    ${button}
    ${setColourPalette(COLOUR_PALETTES.SECONDARY)}
    border: 1px solid;

    &:hover,
    &:focus-within &:active {
        ${setColourPalette(COLOUR_PALETTES.SECONDARY_ACTIVE)}
    }
`;
