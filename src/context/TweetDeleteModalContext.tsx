import { ReactNode, createContext, useCallback, useState } from "react";

interface ContextState {
	tweetId: string | null;
	isOpen: boolean;
	openModal(tweetId: string): void;
	closeModal(): void;
}

export const TweetDeleteModalContext = createContext<ContextState>({
	tweetId: null,
	isOpen: false,
	openModal: () => undefined,
	closeModal: () => undefined,
});

type Props = {
	children: ReactNode;
};
export const TweetDeleteModalProvider = ({ children }: Props) => {
	const [tweetId, setTweetId] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = useCallback((tweetId: string) => {
		setIsOpen(true);
		setTweetId(tweetId);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setTweetId(null);
	}, []);

	return (
		<TweetDeleteModalContext.Provider
			value={{ tweetId, isOpen, openModal, closeModal }}
		>
			{children}
		</TweetDeleteModalContext.Provider>
	);
};
