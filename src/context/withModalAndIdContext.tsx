import { ReactNode, Context, useState, useCallback } from "react";
import { ModalWithIdContextState } from "./createModalWithIdContext";

export default function withModalAndIdContext(
	Context: Context<ModalWithIdContextState>
) {
	function ComponentWithModalAndIdContext({
		children,
	}: {
		children: ReactNode;
	}) {
		const [id, setId] = useState<string>("");
		const [isOpen, setIsOpen] = useState<boolean>(false);

		const openModal = useCallback((id: string) => {
			setIsOpen(true);
			setId(id);
		}, []);

		const closeModal = useCallback(() => {
			setIsOpen(false);
			setId("");
		}, []);

		return (
			<Context.Provider value={{ id, isOpen, openModal, closeModal }}>
				{children}
			</Context.Provider>
		);
	}
	return ComponentWithModalAndIdContext;
}
