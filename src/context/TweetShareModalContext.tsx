import wthModalContext from "./WithModalContext";
import { createModalContext } from "./modalContextFactory";

export const TweetShareModalContext = createModalContext();

const TweetShareModalProvider = wthModalContext(TweetShareModalContext);
export default TweetShareModalProvider;
