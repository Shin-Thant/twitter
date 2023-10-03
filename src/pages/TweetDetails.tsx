import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetTweetByIdQuery } from "../features/tweet/tweetApiSlice";
import TweetHeader from "../components/tweet/TweetHeader";

export default function TweetDetails() {
	const { id: tweetId } = useParams();
	const { isFetching, data } = useGetTweetByIdQuery(
		{ tweetId: tweetId ?? "" },
		{
			skip: !tweetId,
			refetchOnFocus: true,
		}
	);

	if (!tweetId) {
		return "no tweet id!";
	}

	return (
		<Box>
			<Container
				sx={{
					maxWidth: { xs: "xs", normal_sm: "sm", md: "88%" },
					pt: 3,
					px: { xs: 0, sm: 3 },
					"&.MuiBox-root": {
						px: 0,
					},
					color: "text.primary",
				}}
			>
				{isFetching ? (
					"fetching..."
				) : !data ? (
					"no data"
				) : (
					<TweetHeader
						owner={data.owner}
						tweetId={data._id}
						createdAt={data.createdAt}
					/>
				)}
			</Container>
		</Box>
	);
}
