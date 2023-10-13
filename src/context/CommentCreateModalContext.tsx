import { createModalWithIdContext } from "./createModalWithIdContext";
import WithModalAndIdContext from "./WithModalAndIdContext";

export const CommentCreateModalContext = createModalWithIdContext();

export const CommentCreateModalProvider = WithModalAndIdContext(
	CommentCreateModalContext
);
