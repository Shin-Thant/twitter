import React, { createContext } from "react";

export type ModalContext = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const modalState: ModalContext = {
	isOpen: false,
	setIsOpen: () => undefined,
};

export function createModalContext() {
	return createContext(modalState);
}
