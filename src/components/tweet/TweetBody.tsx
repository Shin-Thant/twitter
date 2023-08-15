import { CardContent, Typography } from "@mui/material";
import { Tweet } from "../../features/tweet/tweetTypes";
import NestedTweet from "./NestedTweet";

type Props = {
	tweet: Tweet;
};
const TweetBody = ({ tweet }: Props) => {
	return (
		<CardContent sx={{ px: 1.5 }}>
			{tweet.body && (
				<Typography
					sx={{
						fontSize: { xs: 15.5, sm: 16 },
						mb: tweet.type === "share" ? 1 : 0,
						whiteSpace: "pre-line",
					}}
				>
					{tweet.body}
				</Typography>
			)}

			{tweet.type === "share" && <NestedTweet origin={tweet.origin} />}
		</CardContent>
	);
};

export default TweetBody;
