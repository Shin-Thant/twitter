import { createModalWithIdContext } from "./createModalWithIdContext";
import WithModalAndIdContext from "./WithModalAndIdContext";

export const TweetEditModalContext = createModalWithIdContext();

export const TweetEditModalProvider = WithModalAndIdContext(
	TweetEditModalContext
);
