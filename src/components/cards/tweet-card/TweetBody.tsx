import { Box, CardContent, Typography } from "@mui/material";
import {
	GetTweetByIdResultTweet,
	GetTweetsResultTweet,
} from "../../../features/tweet/tweetTypes";
import TweetImageList from "../../lists/TweetImageList";
import EmptyNestedTweet from "./EmptyNestedTweet";
import NestedTweet from "./NestedTweet";

type Props = {
	tweet: GetTweetsResultTweet | GetTweetByIdResultTweet;
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
				<Box
					sx={{
						mb: tweet.type === "share" ? 1 : 0,
					}}
				>
					<TweetImageList
						images={tweet.images}
						tweetId={tweet._id}
						rowHeight={100}
					/>
				</Box>
			)}

			{tweet.type === "share" && !!tweet.origin && (
				<NestedTweet origin={tweet.origin} />
			)}
			{tweet.type === "share" && !tweet.origin && <EmptyNestedTweet />}
		</CardContent>
	);
};

export default TweetBody;
