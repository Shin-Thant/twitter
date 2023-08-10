import { Container, Divider } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../app/hooks";
import TweetCreator from "../components/tweet/TweetCreator";
import { userSelector } from "../features/user/userSlice";
import TweetsContainer from "../containers/TweetsContainer";
import FloatTweetButton from "../components/buttons/FloatTweetButton";

export default function Home() {
	const user = useAppSelector(userSelector);

	return (
		<>
			<Helmet>
				<title>Twitter | Home</title>
			</Helmet>

			<FloatTweetButton />

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

				<TweetsContainer />
			</Container>
		</>
	);
}
