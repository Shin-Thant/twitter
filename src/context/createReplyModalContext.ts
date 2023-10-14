import { createContext } from "react";

export interface ReplyModalContextState {
	originId: string;
	tweetId: string;
	isOpen: boolean;
	openModal(arg: { tweetId: string; originId: string }): void;
	closeModal(): void;
}
const replyModalContextState: ReplyModalContextState = {
	originId: "",
	tweetId: "",
	isOpen: false,
	openModal: () => undefined,
	closeModal: () => undefined,
};

export function createReplyModalContext() {
	return createContext<ReplyModalContextState>(replyModalContextState);
}
