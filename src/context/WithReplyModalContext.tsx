import { Context, ReactNode, useCallback, useState } from "react";
import { ReplyModalContextState } from "./createReplyModalContext";

export default function WithReplyModalContext(
	Context: Context<ReplyModalContextState>
) {
	function ComponentWithReplyModalContext({
		children,
	}: {
		children: ReactNode;
	}) {
		const [originId, setOriginId] = useState<string>("");
		const [tweetId, setTweetId] = useState<string>("");
		const [isOpen, setIsOpen] = useState<boolean>(false);

		const openModal = useCallback(
			({ originId, tweetId }: { originId: string; tweetId: string }) => {
				setIsOpen(true);
				setOriginId(originId);
				setTweetId(tweetId);
			},
			[]
		);

		const closeModal = useCallback(() => {
			setIsOpen(false);
			setOriginId("");
			setTweetId("");
		}, []);

		return (
			<Context.Provider
				value={{ tweetId, originId, isOpen, openModal, closeModal }}
			>
				{children}
			</Context.Provider>
		);
	}
	return ComponentWithReplyModalContext;
}
