import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";
import { COLOURS } from "../../styles/colours.styles";
import { len } from "../../styles/constants.styles";

export type IconSize = "SMALL" | "LARGE";
function getSize(size: IconSize): string {
    switch (size) {
        case "SMALL":
            return len(8);
        case "LARGE":
            return len(24);
    }
}

function circle(color: string): FlattenSimpleInterpolation {
    return css`
        stroke-width: 5;
        stroke: ${color};
        fill: none;
        stroke-linecap: round;
    `;
}

export function loadingAnimation(size: IconSize): FlattenSimpleInterpolation {
    return css`
        margin: auto;
        display: block;
        shape-rendering: auto;
        width: ${getSize(size)};
        height: ${getSize(size)};
    `;
}

export const outerCircle = circle(COLOURS.PRIMARY);
export const innerCircle = circle(COLOURS.SECONDARY);
