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
		const [originId, setOriginId] = useState<string | undefined>(undefined);
		const [isOpen, setIsOpen] = useState<boolean>(false);

		const openModal = useCallback(
			({
				commentId,
				tweetId,
				originId,
			}: {
				commentId: string;
				tweetId: string;
				originId?: string;
			}) => {
				setIsOpen(true);
				setCommentId(commentId);
				setTweetId(tweetId);
				if (originId) {
					setOriginId(originId);
				}
			},
			[]
		);

		const closeModal = useCallback(() => {
			setIsOpen(false);
			setCommentId("");
			setTweetId("");
			setOriginId(undefined);
		}, []);

		return (
			<Context.Provider
				value={{
					originId,
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
