import { ReactNode, createContext, useCallback, useState } from "react";
import { commentModalContextState } from "./createCommentModalContext";

interface CommentDeleteModalContextState {
	commentId: string;
	isOpen: boolean;
	tweetId?: string;
	getRepliesCacheKey?: string;
	openModal(arg: {
		commentId: string;
		tweetId?: string;
		getRepliesCacheKey?: string;
	}): void;
	closeModal(): void;
}
const commentDeleteModalContextState: CommentDeleteModalContextState = {
	...commentModalContextState,
	getRepliesCacheKey: undefined,
	tweetId: undefined,
};

export const CommentDeleteModalContext =
	createContext<CommentDeleteModalContextState>(
		commentDeleteModalContextState
	);

type Props = {
	children: ReactNode;
};

export function CommentDeleteModalContextProvider({ children }: Props) {
	const [commentId, setCommentId] = useState<string>("");
	const [tweetId, setTweetId] = useState<string | undefined>(undefined);
	const [getRepliesCacheKey, setGetRepliesCacheKey] = useState<
		string | undefined
	>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = useCallback(
		({
			commentId,
			tweetId,
			getRepliesCacheKey,
		}: {
			commentId: string;
			tweetId: string;
			getRepliesCacheKey: string;
		}) => {
			setIsOpen(true);
			setCommentId(commentId);
			setTweetId(tweetId);
			setGetRepliesCacheKey(getRepliesCacheKey);
		},
		[]
	);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setCommentId("");
		setTweetId("");
		setGetRepliesCacheKey("");
	}, []);

	return (
		<CommentDeleteModalContext.Provider
			value={{
				isOpen,
				commentId,
				tweetId,
				getRepliesCacheKey,
				openModal,
				closeModal,
			}}
		>
			{children}
		</CommentDeleteModalContext.Provider>
	);
}
