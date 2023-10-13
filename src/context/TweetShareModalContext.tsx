import { createModalWithIdContext } from "./createModalWithIdContext";
import WithModalAndIdContext from "./WithModalAndIdContext";

export const TweetShareModalContext = createModalWithIdContext();

const TweetShareModalProvider = WithModalAndIdContext(TweetShareModalContext);
export default TweetShareModalProvider;
