import { css } from "@emotion/css";
import { COLOUR_PALETTES, COLOURS, setColourPalette } from "./colours.styles";
import { len, SPACING } from "./constants.styles";

export function shadow(): string {
    return css`
        box-shadow: ${len(1)} ${len(1)} ${len(2)} ${COLOURS.SHADOW};
    `;
}

export function card(): string {
    return css`
        ${setColourPalette(COLOUR_PALETTES.CARD)}
        ${shadow()}
        position: relative;
        background: ${COLOURS.BACKGROUND};
        border-radius: ${len(1)};
        padding: ${SPACING.MEDIUM};
    `;
}
