import { createContext, ReactElement, useState } from "react";

type ContextState = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DrawerControllerContext = createContext<ContextState>({
	isOpen: false,
	setIsOpen: () => undefined,
});

export default function DrawerControllerProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<DrawerControllerContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</DrawerControllerContext.Provider>
	);
}
