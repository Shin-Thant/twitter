import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./withModalAndIdContext";

export const CommentCreateModalContext = createModalWithIdContext();

export const CommentCreateModalProvider = withModalAndIdContext(
	CommentCreateModalContext
);
