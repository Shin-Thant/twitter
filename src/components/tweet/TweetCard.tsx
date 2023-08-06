import { Box, Card } from "@mui/material";
import { ForwardedRef, forwardRef, memo } from "react";
import { Tweet } from "../../features/tweet/tweetTypes";
import TweetActions from "./TweetActions";
import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";
import TweetCommentBtn from "./buttons/TweetCommentBtn";
import TweetLikeBtn from "./buttons/TweetLikeBtn";
import TweetShareBtn from "./buttons/TweetShareBtn";

type Props = {
	tweet: Tweet;
};

const TweetCard = forwardRef(
	({ tweet }: Props, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<Card
				ref={ref}
				sx={{
					borderWidth: { xs: "0 0 1px 0", sm: "1px 1px 1px 1px" },
					borderStyle: "solid",
					borderColor: "tweet.borderColor",
					borderRadius: { xs: "0", sm: "10px" },
					"&.MuiPaper-root": {
						backgroundImage: "none",
						bgcolor: "tweet.bg",
					},
					boxShadow: {
						xs: "none",
						sm: "0 3px 5px rgb(0, 0, 0, 0.2)",
					},
					pb: { xs: 1, sm: 0 },
					mb: { xs: 0, sm: 3 },
				}}
			>
				<TweetHeader
					tweetId={tweet._id}
					owner={tweet.owner}
					createdAt={tweet.createdAt}
				/>

				<Box
					sx={{
						ml: { xs: 0, ss: 7, sm: 7.5 },
					}}
				>
					<TweetBody tweet={tweet} />

					<TweetActions
						likeBtn={
							<TweetLikeBtn
								likes={tweet.likes}
								tweetId={tweet._id}
							/>
						}
						commentBtn={
							<TweetCommentBtn
								comments={tweet.comments}
								tweetId={tweet._id}
							/>
						}
						shareBtn={
							<TweetShareBtn
								shares={tweet.shares}
								tweetId={tweet._id}
							/>
						}
					/>
				</Box>
			</Card>
		);
	}
);
const MemorizedTweetCard = memo(TweetCard);
export default MemorizedTweetCard;
