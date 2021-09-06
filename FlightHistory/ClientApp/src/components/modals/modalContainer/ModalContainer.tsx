import React, { FC, KeyboardEvent } from "react";
import { FadeTransition } from "../../../transitions/FadeTransition";
import { FadeUpTransition } from "../../../transitions/FadeUpTransition";
import { modalContainer } from "./modalContainer.styles";

interface ModalContainerProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({ isOpen, closeModal, children }) => {
    return (
        <FadeTransition isRendered={isOpen}>
            <div className={modalContainer} onClick={closeModal}>
                <FadeUpTransition isRendered={isOpen}>{children}</FadeUpTransition>
            </div>
        </FadeTransition>
    );
};
