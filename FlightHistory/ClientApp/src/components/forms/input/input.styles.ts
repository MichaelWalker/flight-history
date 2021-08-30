import { css } from "@emotion/css";
import { COLOUR_PALETTES, COLOURS, setColourPalette } from "../../../styles/colours.styles";
import { len, TRANSITIONS } from "../../../styles/constants.styles";
import { font, FONTS } from "../../../styles/fonts.styles";

export const input = css`
    ${setColourPalette(COLOUR_PALETTES.DEFAULT)}
    ${font(FONTS.INPUT)}
    color: ${COLOURS.FOREGROUND};
    width: 100%;
    height: ${len(FONTS.INPUT.lineHeight)};
    border: none;
    outline: none;
    transition: all ease ${TRANSITIONS.DEFAULT};

    &:focus-within {
        border-color: ${COLOURS.PRIMARY};
    }
`;
