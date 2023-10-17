import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import ReplyCreateModal from "../../components/modals/ReplyCreateModal";
import CommentsContainer from "../../containers/CommentsContainer";
import Container from "../../containers/Container";
import { useGetTweetByIdQuery } from "../../features/tweet/tweetApiSlice";
import DetailsSection from "./DetailsSection";
import CommentEditModal from "../../components/modals/CommentEditModal";

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
			<CommentEditModal />

			<Container sx={{ color: "text.primary" }}>
				<BackButton text={"Tweet"} spacing={2} sx={{ mb: 4, px: 1 }} />

				{isFetching ? (
					"fetching..."
				) : !data ? (
					"no data"
				) : (
					<>
						<DetailsSection data={data} />

						{/* show comment */}
						<CommentsContainer tweetId={tweetId} />
					</>
				)}
			</Container>
		</>
	);
}
