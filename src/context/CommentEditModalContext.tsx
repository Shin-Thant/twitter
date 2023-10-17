import WithCommentModalContext from "./WithCommentModalContext";
import { createCommentModalContext } from "./createCommentModalContext";

export const CommentEditModalContext = createCommentModalContext();

export const CommentEditModalContextProvider = WithCommentModalContext(
	CommentEditModalContext
);
