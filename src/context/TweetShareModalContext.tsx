import { createModalWithIdContext } from "./createModalWithIdContext";
import withModalAndIdContext from "./WithModalAndIdContext";

export const TweetShareModalContext = createModalWithIdContext();

const TweetShareModalProvider = withModalAndIdContext(TweetShareModalContext);
export default TweetShareModalProvider;
