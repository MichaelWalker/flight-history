import { css, CSSObject } from "@emotion/css";
import { rgba } from "./helpers";

interface ColourPalette {
    primary: string;
    secondary: string;
    foreground: string;
    background: string;
    shadow: string;
}

const WHITE = "#ffffff";
const LIGHT_GREY = "#e1e1e2";
const DARK_GREY = "#686868";
const TEAL = "#3e8989";
const GREEN = "#2cda9d";
const DARK_GREEN = "#1a181b";
const SHADOW = "rgba(0, 0, 0, 50%)";

const DEFAULT_PALETTE = {
    primary: TEAL,
    secondary: GREEN,
    foreground: DARK_GREEN,
    background: LIGHT_GREY,
    shadow: SHADOW,
};

export const COLOUR_PALETTES = {
    DEFAULT: DEFAULT_PALETTE,
    NAV: { ...DEFAULT_PALETTE, foreground: WHITE, background: DARK_GREEN },
    GRADIENT_BACKGROUND: {
        ...DEFAULT_PALETTE,
        foreground: WHITE,
        background: `linear-gradient(45deg, ${TEAL}, ${GREEN})`,
    },
    CARD: { ...DEFAULT_PALETTE, background: WHITE },
    ACTIVE: { ...DEFAULT_PALETTE, foreground: TEAL },
    LABEL: { ...DEFAULT_PALETTE, foreground: DARK_GREY },
} as const;

export const COLOURS = {
    PRIMARY: "var(--color-primary)",
    SECONDARY: "var(--color-secondary)",
    FOREGROUND: "var(--color-foreground)",
    BACKGROUND: "var(--color-background)",
    SHADOW: "var(--color-shadow)",
    BACKGROUND_SELECTED: "var(--color-background-selected)",
} as const;

export function setColourPaletteObject(palette: ColourPalette): CSSObject {
    return {
        "--color-primary": palette.primary,
        "--color-secondary": palette.secondary,
        "--color-foreground": palette.foreground,
        "--color-background": palette.background,
        "--color-shadow": palette.shadow,
        "--color-background-selected": rgba(palette.primary, 0.3),
    };
}

export function setColourPalette(palette: ColourPalette): string {
    return css(setColourPaletteObject(palette));
}

export function gradientBackground(): string {
    return css`
        ${setColourPalette(COLOUR_PALETTES.GRADIENT_BACKGROUND)}
        background: linear-gradient(45deg, ${COLOURS.PRIMARY}, ${COLOURS.SECONDARY});
    `;
}
