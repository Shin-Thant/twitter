import { Context, ReactNode, useCallback, useState } from "react";
import { CommentEditModalContextState } from "./CommentEditModalContext";

export default function WithCommentEditModalContext(
	Context: Context<CommentEditModalContextState>
) {
	function ComponentWithCommentEditModalContext({
		children,
	}: {
		children: ReactNode;
	}) {
		const [commentId, setCommentId] = useState<string>("");
		const [tweetId, setTweetId] = useState<string>("");
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
				originIdOrGetRepliesCacheKey?: string;
			}) => {
				setIsOpen(true);
				setCommentId(commentId);
				setTweetId(tweetId);
				if (originIdOrGetRepliesCacheKey) {
					setOriginIdOrGetRepliesCacheKey(
						originIdOrGetRepliesCacheKey
					);
				}
			},
			[]
		);

		const closeModal = useCallback(() => {
			setIsOpen(false);
			setCommentId("");
			setTweetId("");
			setOriginIdOrGetRepliesCacheKey(undefined);
		}, []);

		return (
			<Context.Provider
				value={{
					originIdOrGetRepliesCacheKey,
					tweetId,
					commentId,
					isOpen,
					openModal,
					closeModal,
				}}
			>
				{children}
			</Context.Provider>
		);
	}
	return ComponentWithCommentEditModalContext;
}
