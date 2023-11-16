import { ReactNode, createContext, useCallback, useState } from "react";
import {
	CommentModalContextState,
	commentModalContextState,
} from "./createCommentModalContext";

interface ReplyCreateModalContextState extends CommentModalContextState {
	getRepliesCacheKey?: string;
	openModal(arg: {
		commentId: string;
		tweetId: string;
		getRepliesCacheKey?: string;
	}): void;
}
const replyCreateModalContextState: ReplyCreateModalContextState = {
	...commentModalContextState,
	getRepliesCacheKey: undefined,
};

export const ReplyCreateModalContext =
	createContext<ReplyCreateModalContextState>(replyCreateModalContextState);

type Props = {
	children: ReactNode;
};

export function ReplyCreateModalContextProvider({ children }: Props) {
	const [commentId, setCommentId] = useState<string>("");
	const [tweetId, setTweetId] = useState<string>("");
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
		setGetRepliesCacheKey(undefined);
	}, []);

	return (
		<ReplyCreateModalContext.Provider
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
		</ReplyCreateModalContext.Provider>
	);
}
