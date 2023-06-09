import { Box, Card } from "@mui/material";
import { ForwardedRef, forwardRef, memo } from "react";
import { Tweet } from "../../features/tweet/types";
import TweetActions from "./TweetActions";
import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";
import TweetLikeBtn from "./buttons/TweetLikeBtn";
import { useAppSelector } from "../../app/hooks";
import { userIdSelector } from "../../features/user/userSlice";
import TweetShareBtn from "./buttons/TweetShareBtn";
import TweetCommentBtn from "./buttons/TweetCommentBtn";

type Props = {
	tweet: Tweet;
};
const TweetCard = forwardRef(
	({ tweet }: Props, ref: ForwardedRef<HTMLDivElement>) => {
		const userId = useAppSelector(userIdSelector);

		return (
			<Card
				ref={ref}
				sx={{
					border: "1px solid hsl(0, 0%, 15%)",
					"&.MuiPaper-root": {
						backgroundImage: "none",
						bgcolor: "tweet.bg",
					},
					mb: "1rem",
				}}
			>
				<TweetHeader owner={tweet.owner} createdAt={tweet.createdAt} />

				<Box
					sx={{
						ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" },
						p: "0.5rem",
					}}
				>
					<TweetBody tweet={tweet} />

					<TweetActions
						likeBtn={
							<TweetLikeBtn
								likes={tweet.likes}
								tweetId={tweet._id}
								userId={userId}
							/>
						}
						commentBtn={
							<TweetCommentBtn
								comments={tweet.comments}
								tweetId={tweet._id}
								userId={userId}
							/>
						}
						shareBtn={
							<TweetShareBtn
								shares={tweet.shares}
								tweetId={tweet._id}
								userId={userId}
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
