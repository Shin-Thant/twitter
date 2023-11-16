import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import CommentEditModal from "../../components/modals/CommentEditModal";
import ReplyCreateModal from "../../components/modals/ReplyCreateModal";
import Container from "../../containers/Container";
import { useGetTweetByIdQuery } from "../../features/tweet/tweetApiSlice";
import CommentsSection from "./CommentsSection";
import DetailsSection from "./DetailsSection";
import CommentDeleteModal from "../../components/modals/CommentDeleteModal";

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
			<CommentDeleteModal />

			<Container sx={{ color: "text.primary" }}>
				<BackButton text={"Tweet"} spacing={2} sx={{ mb: 4, px: 1 }} />

				{isFetching ? (
					"fetching..."
				) : !data ? (
					"no data"
				) : (
					<>
						<DetailsSection data={data} />
						<CommentsSection tweetId={tweetId} />
					</>
				)}
			</Container>
		</>
	);
}
