import { ReactNode, createContext, useCallback, useState } from "react";

type ContextState = {
	isOpen: boolean;
	ownerTweetId: string;
	imageUrl: string;
	showModal: (arg: { ownerTweetId: string; imageUrl: string }) => void;
	closeModal: () => void;
};

const initialState: ContextState = {
	isOpen: false,
	ownerTweetId: "",
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
	const [ownerTweetId, setOwnerTweetId] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");

	const showModal = useCallback(
		({
			ownerTweetId,
			imageUrl,
		}: {
			ownerTweetId: string;
			imageUrl: string;
		}) => {
			setOwnerTweetId(ownerTweetId);
			setImageUrl(imageUrl);
			setIsOpen(true);
		},
		[]
	);

	const closeModal = useCallback(() => {
		setOwnerTweetId("");
		setImageUrl("");
		setIsOpen(false);
	}, []);

	return (
		<ImageModalContext.Provider
			value={{ isOpen, ownerTweetId, imageUrl, showModal, closeModal }}
		>
			{children}
		</ImageModalContext.Provider>
	);
}
