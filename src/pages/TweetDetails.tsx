import { Box, Divider } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import TweetActions from "../components/tweet/TweetActions";
import TweetBody from "../components/tweet/TweetBody";
import TweetHeader from "../components/tweet/TweetHeader";
import TweetCommentBtn from "../components/tweet/buttons/TweetCommentButton";
import TweetLikeBtn from "../components/tweet/buttons/TweetLikeBtn";
import TweetShareBtn from "../components/tweet/buttons/TweetShareBtn";
import CommentsContainer from "../containers/CommentsContainer";
import Container from "../containers/Container";
import { useGetTweetByIdQuery } from "../features/tweet/tweetApiSlice";
import ReplyCreateModal from "../components/modals/ReplyCreateModal";

export default function TweetDetails() {
	const { id: tweetId } = useParams();

	const { isFetching, data } = useGetTweetByIdQuery(
		{ tweetId: tweetId ?? "" },
		{
			skip: !tweetId,
			refetchOnFocus: true,
			pollingInterval: 15 * 60 * 60 * 1000,
		}
	);

	if (!tweetId) {
		return <>"no tweet id!"</>;
	}

	return (
		<>
			<Helmet>
				<title>
					{data ? `${data.owner.username}'s Tweet` : "Tweet Details"}
				</title>
			</Helmet>

			<ReplyCreateModal />

			<Container sx={{ color: "text.primary" }}>
				<BackButton text={"Tweet"} spacing={2} sx={{ mb: 4, px: 1 }} />

				{isFetching ? (
					"fetching..."
				) : !data ? (
					"no data"
				) : (
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
							likeBtn={
								<TweetLikeBtn
									likes={data.likes}
									tweetId={data._id}
								/>
							}
							commentBtn={
								<TweetCommentBtn
									comments={data.comments}
									tweetId={data._id}
								/>
							}
							shareBtn={
								<TweetShareBtn
									shares={data.shares}
									tweetId={data._id}
								/>
							}
						/>

						<Divider sx={{ mb: 3 }} />

						{/* show comment */}
						<CommentsContainer tweetId={tweetId} />
					</>
				)}
			</Container>
		</>
	);
}
