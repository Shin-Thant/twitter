import wthModalContext from "./WithModalContext";
import { createModalContext } from "./createModalContext";

export const TweetShareModalContext = createModalContext();

const TweetShareModalProvider = wthModalContext(TweetShareModalContext);
export default TweetShareModalProvider;
