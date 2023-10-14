import WithReplyModalContext from "./WithReplyModalContext";
import { createReplyModalContext } from "./createReplyModalContext";

export const ReplyCreateModalContext = createReplyModalContext();

export const ReplyCreateModalContextProvider = WithReplyModalContext(
	ReplyCreateModalContext
);
