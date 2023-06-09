import React, { type ReactNode, useState, createContext } from "react";

type ContextState = {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const initialState = { currentPage: 1, setCurrentPage: () => undefined };

export const CurrentPageContext = createContext<ContextState>(initialState);

type Props = {
	children: ReactNode;
};
export default function CurrentPageProvider({ children }: Props) {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
			{children}
		</CurrentPageContext.Provider>
	);
}
