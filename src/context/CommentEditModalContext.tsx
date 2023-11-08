import { createContext } from "react";
import WithCommentEditModalContext from "./WithCommentEditModalContext";
import { CommentModalContextState } from "./createCommentModalContext";

export interface CommentEditModalContextState extends CommentModalContextState {
	originIdOrGetRepliesCacheKey?: string;
	openModal(arg: {
		tweetId: string;
		commentId: string;
		originIdOrGetRepliesCacheKey?: string;
	}): void;
}
const commentEditModalContextState: CommentEditModalContextState = {
	commentId: "",
	tweetId: "",
	originIdOrGetRepliesCacheKey: undefined,
	isOpen: false,
	openModal: () => undefined,
	closeModal: () => undefined,
};

export const CommentEditModalContext =
	createContext<CommentEditModalContextState>(commentEditModalContextState);

export const CommentEditModalContextProvider = WithCommentEditModalContext(
	CommentEditModalContext
);
