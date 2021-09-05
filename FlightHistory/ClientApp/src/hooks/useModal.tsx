import React, { ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../components/modals/modal/Modal";
import { ModalContainer } from "../components/modals/modalContainer/ModalContainer";

export const MODAL_ROOT_ID = "modal-root";

interface UseModalResult {
    openModal: () => void;
    renderInModal: (modal: ReactNode) => ReactNode;
}

export function useModal(): UseModalResult {
    const [isOpen, setIsOpen] = useState(false);

    function openModal() {
        console.log("opening modal");
        setIsOpen(true);
    }

    function closeModal() {
        console.log("closing modal");
        setIsOpen(false);
    }

    function renderInModal(modal: ReactNode): ReactNode {
        const rootElement = document.getElementById(MODAL_ROOT_ID);
        if (!rootElement) {
            return null;
        }

        console.log("render in modal");

        return createPortal(
            <ModalContainer isOpen={isOpen}>
                <Modal closeModal={closeModal}>{modal}</Modal>
            </ModalContainer>,
            rootElement,
        );
    }

    return {
        openModal,
        renderInModal,
    };
}
