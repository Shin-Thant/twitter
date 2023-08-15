import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./withModalAndIdContext";

export const TweetShareModalContext = createModalWithIdContext();

const TweetShareModalProvider = withModalAndIdContext(TweetShareModalContext);
export default TweetShareModalProvider;
