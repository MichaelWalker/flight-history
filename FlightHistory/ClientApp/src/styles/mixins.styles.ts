import { css, CSSObject } from "@emotion/css";
import { COLOUR_PALETTES, COLOURS, setColourPalette } from "./colours.styles";
import { len, SPACING } from "./constants.styles";

const outlineBackgroundBand = `0 0 0 ${len(0.5)} ${COLOURS.BACKGROUND}`;
const outlineHighlightBand = `0 0 0 ${len(1)} ${COLOURS.PRIMARY}`;
const boxShadow = `${len(1)} ${len(1)} ${len(2)} ${COLOURS.SHADOW}`;

export function shadow(): string {
    return css`
        box-shadow: ${boxShadow};
    `;
}

export function focusableObject(): CSSObject {
    return {
        borderRadius: len(1),
        "&:focus, &:focus-within": {
            outline: "none",
            boxShadow: `${outlineBackgroundBand}, ${outlineHighlightBand}`,
        },
    };
}

export function focusable(): string {
    return css(focusableObject());
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
