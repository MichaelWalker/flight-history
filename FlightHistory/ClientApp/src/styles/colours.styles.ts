import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";

interface ColourPalette {
    primary: string;
    secondary: string;
    foreground: string;
    background: string;
    shadow: string;
}

const WHITE = "#ffffff";
const TEAL = "#3e8989";
const GREEN = "#2cda9d";
const DARK_GREEN = "#1a181b";
const SHADOW = "rgba(0, 0, 0, 50%)";

const DEFAULT_PALETTE = {
    primary: TEAL,
    secondary: GREEN,
    foreground: DARK_GREEN,
    background: WHITE,
    shadow: SHADOW,
};

export const COLOUR_PALETTES = {
    MEDIUM: DEFAULT_PALETTE,
    NAV: { ...DEFAULT_PALETTE, foreground: WHITE, background: DARK_GREEN },
    GRADIENT_BACKGROUND: {
        ...DEFAULT_PALETTE,
        foreground: WHITE,
        background: `linear-gradient(45deg, ${TEAL}, ${GREEN})`,
    },
} as const;

export const COLOURS = {
    PRIMARY: "var(--color-primary)",
    SECONDARY: "var(--color-secondary)",
    FOREGROUND: "var(--color-foreground)",
    BACKGROUND: "var(--color-background)",
    SHADOW: "var(--color-shadow)",
} as const;

export function setColourPalette(palette: ColourPalette): FlattenSimpleInterpolation {
    return css`
        --color-primary: ${palette.primary};
        --color-secondary: ${palette.secondary};
        --color-foreground: ${palette.foreground};
        --color-background: ${palette.background};
        --color-shadow: ${palette.shadow};
    `;
}

export function gradientBackground(): FlattenSimpleInterpolation {
    return css`
        ${setColourPalette(COLOUR_PALETTES.GRADIENT_BACKGROUND)}
        background: linear-gradient(45deg, ${COLOURS.PRIMARY}, ${COLOURS.SECONDARY});
    `;
}
