import { createContext } from "react";

export interface ModalWithIdContextState {
	id: string;
	isOpen: boolean;
	openModal(id: string): void;
	closeModal(): void;
}
const modalWithIdState: ModalWithIdContextState = {
	id: "",
	isOpen: false,
	openModal: () => undefined,
	closeModal: () => undefined,
};

export function createModalWithIdContext() {
	return createContext<ModalWithIdContextState>(modalWithIdState);
}
