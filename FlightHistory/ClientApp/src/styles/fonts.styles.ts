import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";
import { len } from "./constants.styles";
import { COLOURS } from "./colours.styles";

interface Font {
    size: number;
    lineHeight: number;
    fontWeight: 300 | 400 | 500;
    transform: "none" | "uppercase";
}

export const FONTS = {
    MEDIUM: { size: 4, lineHeight: 6, fontWeight: 300, transform: "none" },
    PAGE_TITLE: { size: 4, lineHeight: 8, fontWeight: 500, transform: "uppercase" },
    SECTION_TITLE: { size: 6, lineHeight: 8, fontWeight: 300, transform: "none" },
    LOGO: { size: 5, lineHeight: 8, fontWeight: 300, transform: "uppercase" },
} as const;

export function font({
    size,
    lineHeight,
    fontWeight,
    transform,
}: Font): FlattenSimpleInterpolation {
    return css`
        font-size: ${len(size)};
        line-height: ${len(lineHeight)};
        font-weight: ${fontWeight};
        font-family: "Ubuntu", sans-serif;
        color: ${COLOURS.FOREGROUND};
        text-transform: ${transform};
    `;
}
