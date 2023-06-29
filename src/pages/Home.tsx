import TweetInfoModal from "../components/modals/TweetInfoModal";
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
