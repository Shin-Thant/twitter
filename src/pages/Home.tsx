import { Divider } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../app/hooks";
import FloatTweetButton from "../components/buttons/FloatTweetButton";
import TweetCreator from "../components/forms/TweetCreateForm";
import TweetsContainer from "../containers/TweetsContainer";
import { userSelector } from "../features/user/userSlice";
import Container from "../containers/Container";

export default function Home() {
	const user = useAppSelector(userSelector);

	return (
		<>
			<Helmet>
				<title>Twitter | Home</title>
			</Helmet>

			<FloatTweetButton />

			<Container>
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
