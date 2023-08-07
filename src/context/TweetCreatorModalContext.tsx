import withModalContext from "./WithModalContext";
import { createModalContext } from "./createModalContext";

export const TweetCreatorModalContext = createModalContext();

export const TweetCreatorModalProvider = withModalContext(
	TweetCreatorModalContext
);
