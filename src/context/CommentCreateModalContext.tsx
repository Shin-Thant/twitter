import withModalContext from "./WithModalContext";
import { createModalContext } from "./createModalContext";

// TODO: update context to get the tweet to comment on
export const CommentCreateModalContext = createModalContext();

export const CommentCreateModalProvider = withModalContext(
	CommentCreateModalContext
);
