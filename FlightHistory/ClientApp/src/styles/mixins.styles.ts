import { css, CSSObject } from "@emotion/css";
import { COLOUR_PALETTES, ColourPalette, COLOURS, setColourPalette } from "./colours.styles";
import { len, SPACING } from "./constants.styles";

const outlineBackgroundBand = (colour: string) => `0 0 0 ${len(0.5)} ${colour}`;
const outlineHighlightBand = (colour: string) => `0 0 0 ${len(1)} ${colour}`;
const boxShadow = `${len(1)} ${len(1)} ${len(2)} ${COLOURS.SHADOW}`;

export function shadow(): string {
    return css`
        box-shadow: ${boxShadow};
    `;
}

export function focusableObject(
    backgroundPalette: ColourPalette = COLOUR_PALETTES.CARD,
): CSSObject {
    return {
        borderRadius: len(1),
        "&:focus, &:focus-within": {
            outline: "none",
            boxShadow: `${outlineBackgroundBand(
                backgroundPalette.background,
            )}, ${outlineHighlightBand(backgroundPalette.primary)}`,
        },
    };
}

export function focusable(backgroundPalette: ColourPalette = COLOUR_PALETTES.CARD): string {
    return css(focusableObject(backgroundPalette));
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
