import { ReactNode } from "react";
import wthModalContext from "./WithModalContext";
import { createModalContext } from "./modalContextFactory";

export const TweetShareModalContext = createModalContext();

type Props = {
	children: ReactNode;
};
function TweetShareModal({ children }: Props) {
	return <>{children}</>;
}

const TweetShareModalProvider = wthModalContext(
	TweetShareModal,
	TweetShareModalContext
);
export default TweetShareModalProvider;
