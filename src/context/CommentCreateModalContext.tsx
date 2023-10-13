import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./WithModalAndIdContext";

export const CommentCreateModalContext = createModalWithIdContext();

export const CommentCreateModalProvider = withModalAndIdContext(
	CommentCreateModalContext
);
