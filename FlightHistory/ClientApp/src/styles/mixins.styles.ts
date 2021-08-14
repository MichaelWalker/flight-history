import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";
import { COLOURS } from "./colours.styles";
import { len } from "./constants.styles";

export function shadow(): FlattenSimpleInterpolation {
    return css`
        box-shadow: ${len(1)} ${len(1)} ${len(2)} ${COLOURS.SHADOW};
    `;
}
