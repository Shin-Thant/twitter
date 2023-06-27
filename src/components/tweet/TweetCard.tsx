import { Box, Card } from "@mui/material";
import { ForwardedRef, forwardRef, memo, useState } from "react";
import { Tweet } from "../../features/tweet/tweetTypes";
import TweetActions from "./TweetActions";
import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";
import TweetLikeBtn from "./buttons/TweetLikeBtn";
import { useAppSelector } from "../../app/hooks";
import { userIdSelector } from "../../features/user/userSlice";
import TweetShareBtn from "./buttons/TweetShareBtn";
import TweetCommentBtn from "./buttons/TweetCommentBtn";
import TweetShareModal from "../modals/tweetShareModal/TweetShareModal";

type Props = {
	tweet: Tweet;
};
const TweetCard = forwardRef(
	({ tweet }: Props, ref: ForwardedRef<HTMLDivElement>) => {
		// TODO: move userId to components which use it
		const userId = useAppSelector(userIdSelector);
		const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
								setModalOpen={setIsShareModalOpen}
								shares={tweet.shares}
								userId={userId}
							/>
						}
					/>

					<TweetShareModal
						tweetId={tweet._id}
						shares={tweet.shares}
						isOpen={isShareModalOpen}
						setIsOpen={setIsShareModalOpen}
					/>
				</Box>
			</Card>
		);
	}
);
const MemorizedTweetCard = memo(TweetCard);
export default MemorizedTweetCard;
