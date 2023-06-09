import TweetInfoModal from "../components/modals/TweetInfoModal";
import TweetsContainer from "../containers/TweetsContainer";
import CurrentPageProvider from "../context/CurrentPageContext";
import TweetInfoModalProvider from "../context/TwetInfoModalContext";

export default function Home() {
	return (
		<div>
			<CurrentPageProvider>
				<TweetInfoModalProvider>
					<TweetInfoModal />
				<TweetsContainer />
				</TweetInfoModalProvider>
			</CurrentPageProvider>
		</div>
	);
}
