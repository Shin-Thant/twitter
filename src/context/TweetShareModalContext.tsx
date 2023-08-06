import { ReactNode, createContext, useCallback, useState } from "react";

interface ContextState {
	isOpen: boolean;
	tweetId: string;
	openModal: (tweetId: string) => void;
	closeModal: () => void;
}

const initialState: ContextState = {
	isOpen: false,
	tweetId: "",
	openModal: () => undefined,
	closeModal: () => undefined,
};

export const TweetShareModalContext = createContext<ContextState>(initialState);

type Props = {
	children: ReactNode;
};

const TweetShareModalProvider = ({ children }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tweetId, setTweetId] = useState<string>("64ce08bd49d4dab82f0e7124");

	const openModal = useCallback((tweetId: string) => {
		setTweetId(tweetId);
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<TweetShareModalContext.Provider
			value={{ isOpen, tweetId, openModal, closeModal }}
		>
			{children}
		</TweetShareModalContext.Provider>
	);
};
export default TweetShareModalProvider;
