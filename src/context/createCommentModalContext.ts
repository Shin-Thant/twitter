import { createContext } from "react";

export interface CommentModalContextState {
	commentId: string;
	tweetId: string;
	isOpen: boolean;
	openModal(arg: { tweetId: string; commentId: string }): void;
	closeModal(): void;
}
export const commentModalContextState: CommentModalContextState = {
	commentId: "",
	tweetId: "",
	isOpen: false,
	openModal: () => undefined,
	closeModal: () => undefined,
};

export function createCommentModalContext() {
	return createContext<CommentModalContextState>(commentModalContextState);
}
