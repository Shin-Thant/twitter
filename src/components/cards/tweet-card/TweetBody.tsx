import { CardContent, Typography } from "@mui/material";
import { GetTweetsResultTweet } from "../../../features/tweet/tweetTypes";
import TweetImageList from "../../lists/TweetImageList";
import EmptyNestedTweet from "./EmptyNestedTweet";
import NestedTweet from "./NestedTweet";

type Props = {
	tweet: GetTweetsResultTweet;
};
const TweetBody = ({ tweet }: Props) => {
	return (
		<CardContent sx={{ px: 1.5 }}>
			{tweet.body && (
				<Typography
					sx={{
						fontSize: { xs: 15.5, sm: 16 },
						mb:
							tweet.type === "share" || !!tweet.images.length
								? 1
								: 0,
						whiteSpace: "pre-line",
					}}
				>
					{tweet.body}
				</Typography>
			)}

			{!!tweet.images?.length && (
				<TweetImageList
					images={tweet.images}
					tweetId={tweet._id}
					rowHeight={100}
				/>
			)}

			{tweet.type === "share" && !!tweet.origin && (
				<NestedTweet origin={tweet.origin} />
			)}
			{tweet.type === "share" && !tweet.origin && <EmptyNestedTweet />}
		</CardContent>
	);
};

export default TweetBody;
