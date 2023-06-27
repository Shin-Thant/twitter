import React, { ReactNode, Context, ElementType, useState } from "react";
import { ModalContext } from "./modalContextFactory";

export default function wthModalContext(
	Original: ElementType,
	Context: Context<ModalContext>
) {
	function New({ children }: { children: ReactNode }) {
		const [isOpen, setIsOpen] = useState(false);
		return (
			<Context.Provider value={{ isOpen, setIsOpen }}>
				<Original>{children}</Original>
			</Context.Provider>
		);
	}
	return New;
}
