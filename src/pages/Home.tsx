import TweetInfoModal from "../components/modals/TweetInfoModal";
import TweetShareModal from "../components/modals/tweetShareModal/TweetShareModal";
import TweetsContainer from "../containers/TweetsContainer";
import CurrentPageProvider from "../context/CurrentPageContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";

export default function Home() {
	return (
		<div>
			<CurrentPageProvider>
				<TweetInfoModalProvider>
					<TweetShareModalProvider>
						<TweetInfoModal />
						<TweetsContainer />
					</TweetShareModalProvider>
				</TweetInfoModalProvider>
			</CurrentPageProvider>
		</div>
	);
}
