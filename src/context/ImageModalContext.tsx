import { ReactNode, createContext, useCallback, useState } from "react";

type ContextState = {
	isOpen: boolean;
	tweetId: string;
	imageUrl: string;
	showModal: (arg: { tweetId: string; imageUrl: string }) => void;
	closeModal: () => void;
};

const initialState: ContextState = {
	isOpen: false,
	tweetId: "",
	imageUrl: "",
	showModal: () => undefined,
	closeModal: () => undefined,
};
export const ImageModalContext = createContext<ContextState>(initialState);

type Props = {
	children: ReactNode;
};
export function ImageModalProvider({ children }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tweetId, setTweetId] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");

	const showModal = useCallback(
		({ tweetId, imageUrl }: { tweetId: string; imageUrl: string }) => {
			setTweetId(tweetId);
			setImageUrl(imageUrl);
			setIsOpen(true);
		},
		[]
	);

	const closeModal = useCallback(() => {
		setTweetId("");
		setImageUrl("");
		setIsOpen(false);
	}, []);

	return (
		<ImageModalContext.Provider
			value={{ isOpen, tweetId, imageUrl, showModal, closeModal }}
		>
			{children}
		</ImageModalContext.Provider>
	);
}
