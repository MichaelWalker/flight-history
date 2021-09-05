import React, { FC } from "react";
import { Fade } from "../../../transitions/Fade";
import { modalContainer } from "./modalContainer.styles";

interface ModalContainerProps {
    isOpen: boolean;
}

export const ModalContainer: FC<ModalContainerProps> = ({ isOpen, children }) => {
    return (
        <Fade isRendered={isOpen}>
            <div className={modalContainer}>{children}</div>
        </Fade>
    );
};
