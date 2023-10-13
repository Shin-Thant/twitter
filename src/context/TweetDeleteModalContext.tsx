import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./WithModalAndIdContext";

export const TweetDeleteModalContext = createModalWithIdContext();

export const TweetDeleteModalProvider = withModalAndIdContext(
	TweetDeleteModalContext
);
