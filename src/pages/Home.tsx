import { Container, Divider } from "@mui/material";
import TweetInfoModal from "../components/modals/TweetInfoModal";
import TweetsContainer from "../containers/TweetsContainer";
import CurrentPageProvider from "../context/CurrentPageContext";
import TweetInfoModalProvider from "../context/TweetInfoModalContext";
import TweetShareModalProvider from "../context/TweetShareModalContext";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import TweetCreator from "../components/others/TweetCreator";

export default function Home() {
	const user = useAppSelector(userSelector);

	return (
		<Container
			sx={{
				maxWidth: { xs: "xs", normal_sm: "sm", md: "88%" },
				pt: 3,
				px: { xs: 0, sm: 3 },
				"&.MuiBox-root": {
					px: 0,
				},
			}}
		>
			{user && (
				<>
					<TweetCreator user={user} />
					<Divider sx={{ my: 3 }} />
				</>
			)}

			<CurrentPageProvider>
				<TweetInfoModalProvider>
					<TweetShareModalProvider>
						<TweetInfoModal />
						<TweetsContainer />
					</TweetShareModalProvider>
				</TweetInfoModalProvider>
			</CurrentPageProvider>
		</Container>
	);
}
