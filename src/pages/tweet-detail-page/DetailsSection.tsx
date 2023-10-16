import { Box, Divider } from "@mui/material";
import TweetActions from "../../components/cards/tweet-card/TweetActions";
import TweetBody from "../../components/cards/tweet-card/TweetBody";
import TweetHeader from "../../components/cards/tweet-card/TweetHeader";
import TweetCommentBtn from "../../components/cards/tweet-card/buttons/TweetCommentButton";
import TweetLikeBtn from "../../components/cards/tweet-card/buttons/TweetLikeBtn";
import TweetShareBtn from "../../components/cards/tweet-card/buttons/TweetShareBtn";
import { GetTweetByIdResult } from "../../features/tweet/tweetTypes";

type Props = {
	data: GetTweetByIdResult;
};

const DetailsSection = ({ data }: Props) => {
	return (
		<>
			<TweetHeader
				owner={data.owner}
				tweetId={data._id}
				createdAt={data.createdAt}
			/>

			<Box
				sx={{
					my: 0.5,
					pl: { xs: 5.5, ss: 7, sm: 7.5 },
				}}
			>
				<TweetBody tweet={data} />
			</Box>

			<Divider />

			<TweetActions
				likeBtn={<TweetLikeBtn likes={data.likes} tweetId={data._id} />}
				commentBtn={
					<TweetCommentBtn
						comments={data.comments}
						tweetId={data._id}
					/>
				}
				shareBtn={
					<TweetShareBtn shares={data.shares} tweetId={data._id} />
				}
			/>

			<Divider sx={{ mb: 3 }} />
		</>
	);
};

export default DetailsSection;
