import { css } from "@emotion/css";
import { len } from "./constants.styles";
import { COLOURS } from "./colours.styles";

interface Font {
    size: number;
    lineHeight: number;
    fontWeight: 300 | 400 | 500;
    transform: "none" | "uppercase";
}

export const FONTS = {
    DEFAULT: { size: 4, lineHeight: 6, fontWeight: 300, transform: "none" },
    PAGE_TITLE: { size: 4, lineHeight: 8, fontWeight: 500, transform: "uppercase" },
    SECTION_TITLE: { size: 6, lineHeight: 8, fontWeight: 300, transform: "none" },
    LOGO: { size: 5, lineHeight: 8, fontWeight: 300, transform: "uppercase" },
    INPUT_LABEL_COLLAPSED: { size: 3, lineHeight: 3, fontWeight: 300, transform: "uppercase" },
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
