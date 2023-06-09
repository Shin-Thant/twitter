import { ReactElement, createContext, useState } from "react";

type ContextState = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ThemeModalContext = createContext<ContextState>({
	isOpen: false,
	setIsOpen: () => undefined,
});

export default function ThemeModalProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<ThemeModalContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</ThemeModalContext.Provider>
	);
}
