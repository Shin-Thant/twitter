import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./WithModalAndIdContext";

export const TweetEditModalContext = createModalWithIdContext();

export const TweetEditModalProvider = withModalAndIdContext(
	TweetEditModalContext
);
