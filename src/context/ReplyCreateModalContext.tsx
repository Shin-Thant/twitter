import WithCommentModalContext from "./WithCommentModalContext";
import { createCommentModalContext } from "./createCommentModalContext";

export const ReplyCreateModalContext = createCommentModalContext();

export const ReplyCreateModalContextProvider = WithCommentModalContext(
	ReplyCreateModalContext
);
