import styled from "styled-components";
import { TRANSITIONS } from "../styles/constants.styles";

export const SlideAndFadeWrapper = styled.div`
    .slide-and-fade-enter {
        opacity: 0;
        transform: translateX(-50%);
    }

    .slide-and-fade-enter-active {
        transition: all ease ${TRANSITIONS.DEFAULT};
        opacity: 1;
        transform: translateX(0);
    }

    .slide-and-fade-enter-done {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-and-fade-exit {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-and-fade-exit-active {
        transition: all ease ${TRANSITIONS.DEFAULT};
        opacity: 0;
        transform: translateX(50%);
    }

    .slide-and-fade-exit-done {
        opacity: 0;
        transform: translateX(50%);
    }
`;
