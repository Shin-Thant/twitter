import { ReactNode, Context, useState } from "react";
import { ModalContextState } from "./modalContextFactory";

export default function withModalContext(Context: Context<ModalContextState>) {
	function ComponentWithModalContext({ children }: { children: ReactNode }) {
		const [isOpen, setIsOpen] = useState(false);
		return (
			<Context.Provider value={{ isOpen, setIsOpen }}>
				{children}
			</Context.Provider>
		);
	}
	return ComponentWithModalContext;
}
