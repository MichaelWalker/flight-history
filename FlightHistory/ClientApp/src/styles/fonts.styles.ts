import { css } from "@emotion/css";
import { len } from "./constants.styles";
import { COLOURS } from "./colours.styles";

interface Font {
    size: number;
    lineHeight: number;
    fontWeight: 300 | 400 | 500;
    transform: "none" | "uppercase";
}

const DEFAULT_FONT = { size: 4, lineHeight: 6, fontWeight: 300, transform: "none" } as const;
const INPUT_FONT = { ...DEFAULT_FONT, lineHeight: 8 } as const;

export const FONTS = {
    DEFAULT: DEFAULT_FONT,
    PAGE_TITLE: { size: 4, lineHeight: 8, fontWeight: 500, transform: "uppercase" },
    SECTION_TITLE: { size: 6, lineHeight: 8, fontWeight: 300, transform: "none" },
    LOGO: { size: 5, lineHeight: 8, fontWeight: 300, transform: "uppercase" },
    INPUT: INPUT_FONT,
    INPUT_LABEL_COLLAPSED: { size: 3, lineHeight: 3, fontWeight: 300, transform: "uppercase" },
    INPUT_LABEL_EXPANDED: { ...INPUT_FONT, transform: "uppercase" },
    BUTTON: { ...DEFAULT_FONT, fontWeight: 500, lineHeight: 10 },
} as const;

export function fontObject({ size, lineHeight, fontWeight, transform }: Font) {
    return {
        fontSize: len(size),
        lineHeight: len(lineHeight),
        fontWeight: fontWeight,
        fontFamily: '"Ubuntu", sans-serif',
        color: COLOURS.FOREGROUND,
        textTransform: transform,
    };
}

export function font(props: Font): string {
    return css(fontObject(props));
}
