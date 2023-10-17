import { Context, ReactNode, useCallback, useState } from "react";
import { CommentModalContextState } from "./createCommentModalContext";

export default function WithCommentModalContext(
	Context: Context<CommentModalContextState>
) {
	function ComponentWithReplyModalContext({
		children,
	}: {
		children: ReactNode;
	}) {
		const [commentId, setCommentId] = useState<string>("");
		const [tweetId, setTweetId] = useState<string>("");
		const [isOpen, setIsOpen] = useState<boolean>(false);

		const openModal = useCallback(
			({
				commentId,
				tweetId,
			}: {
				commentId: string;
				tweetId: string;
			}) => {
				setIsOpen(true);
				setCommentId(commentId);
				setTweetId(tweetId);
			},
			[]
		);

		const closeModal = useCallback(() => {
			setIsOpen(false);
			setCommentId("");
			setTweetId("");
		}, []);

		return (
			<Context.Provider
				value={{ tweetId, commentId, isOpen, openModal, closeModal }}
			>
				{children}
			</Context.Provider>
		);
	}
	return ComponentWithReplyModalContext;
}
