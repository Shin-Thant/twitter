import { ReactNode, createContext, useCallback, useState } from "react";
import { commentModalContextState } from "./createCommentModalContext";

interface CommentDeleteModalContextState {
	commentId: string;
	isOpen: boolean;
	tweetId?: string;
	originIdOrGetRepliesCacheKey?: string;
	openModal(arg: {
		commentId: string;
		tweetId?: string;
		originIdOrGetRepliesCacheKey?: string;
	}): void;
	closeModal(): void;
}
const commentDeleteModalContextState: CommentDeleteModalContextState = {
	...commentModalContextState,
	originIdOrGetRepliesCacheKey: undefined,
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
	const [originIdOrGetRepliesCacheKey, setOriginIdOrGetRepliesCacheKey] =
		useState<string | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openModal = useCallback(
		({
			commentId,
			tweetId,
			originIdOrGetRepliesCacheKey,
		}: {
			commentId: string;
			tweetId: string;
			originIdOrGetRepliesCacheKey: string;
		}) => {
			setIsOpen(true);
			setCommentId(commentId);
			setTweetId(tweetId);
			setOriginIdOrGetRepliesCacheKey(originIdOrGetRepliesCacheKey);
		},
		[]
	);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setCommentId("");
		setTweetId("");
		setOriginIdOrGetRepliesCacheKey("");
	}, []);

	return (
		<CommentDeleteModalContext.Provider
			value={{
				isOpen,
				commentId,
				tweetId,
				originIdOrGetRepliesCacheKey,
				openModal,
				closeModal,
			}}
		>
			{children}
		</CommentDeleteModalContext.Provider>
	);
}
