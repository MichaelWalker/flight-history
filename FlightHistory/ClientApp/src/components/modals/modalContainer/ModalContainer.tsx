import React, { FC } from "react";
import { FadeTransition } from "../../../transitions/FadeTransition";
import { FadeUpTransition } from "../../../transitions/FadeUpTransition";
import { modalContainer } from "./modalContainer.styles";

interface ModalContainerProps {
    isOpen: boolean;
}

export const ModalContainer: FC<ModalContainerProps> = ({ isOpen, children }) => {
    return (
        <FadeTransition isRendered={isOpen}>
            <div className={modalContainer}>
                <FadeUpTransition isRendered={isOpen}>{children}</FadeUpTransition>
            </div>
        </FadeTransition>
    );
};
