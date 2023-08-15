import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./withModalAndIdContext";

export const TweetDeleteModalContext = createModalWithIdContext();

export const TweetDeleteModalProvider = withModalAndIdContext(
	TweetDeleteModalContext
);
