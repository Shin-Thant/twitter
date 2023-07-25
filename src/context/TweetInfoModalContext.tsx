import { createModalContext } from "./createModalContext";
import withModalContext from "./WithModalContext";

export const TweetInfoModalContext = createModalContext();

const TweetInfoModalProvider = withModalContext(TweetInfoModalContext);
export default TweetInfoModalProvider;
