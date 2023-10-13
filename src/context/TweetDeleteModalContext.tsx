import { createModalWithIdContext } from "./createModalWithIdContext";
import WithModalAndIdContext from "./WithModalAndIdContext";

export const TweetDeleteModalContext = createModalWithIdContext();

export const TweetDeleteModalProvider = WithModalAndIdContext(
	TweetDeleteModalContext
);
