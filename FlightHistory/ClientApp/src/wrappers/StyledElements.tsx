import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";
import { Link as ReactRouterLink } from "react-router-dom";

interface StyledElementProps {
    css?: FlattenSimpleInterpolation;
}

export const Div = styled.div<StyledElementProps>`
    ${(p) => p.css}
`;

export const Header = styled.header<StyledElementProps>`
    ${(p) => p.css}
`;

export const H1 = styled.h1<StyledElementProps>`
    ${(p) => p.css}
`;

export const Main = styled.main<StyledElementProps>`
    ${(p) => p.css}
`;

export const Link = styled(ReactRouterLink)<StyledElementProps>`
    ${(p) => p.css}
`;
