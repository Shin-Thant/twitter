import React, { createContext } from "react";

export type ModalContextState = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const modalState: ModalContextState = {
	isOpen: false,
	setIsOpen: () => undefined,
};

export function createModalContext() {
	return createContext<ModalContextState>(modalState);
}
