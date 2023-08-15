import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./withModalAndIdContext";

export const TweetEditModalContext = createModalWithIdContext();

export const TweetEditModalProvider = withModalAndIdContext(
	TweetEditModalContext
);
