import { createContext, ReactElement, useState } from "react";

type ContextState = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TweetInfoModalContext = createContext<ContextState>({
	isOpen: false,
	setIsOpen: () => undefined,
});

export default function TweetInfoModalProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<TweetInfoModalContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</TweetInfoModalContext.Provider>
	);
}
