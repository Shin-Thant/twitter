import { Container } from "@mui/material";
import { useCallback } from "react";
import TweetCard from "../components/tweet/TweetCard";
import { useGetTweetsQuery } from "../features/tweet/tweetApiSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useCurrentPage from "../hooks/useCurrentPage";

export default function TweetsContainer() {
	const { currentPage, setCurrentPage } = useCurrentPage();

	const { isLoading, isFetching, data } = useGetTweetsQuery(
		{ itemsPerPage: 10, currentPage },
		{
			pollingInterval: 30 * 60 * 1000,
			refetchOnReconnect: true,
			skip: currentPage < 1,
		}
	);

	const incrementPage = useCallback(() => {
		setCurrentPage((prev) => prev + 1);
	}, [setCurrentPage]);

	const lastTweetRef = useInfiniteScroll({
		isFetching,
		hasNextPage: data?.hasNextPage ?? false,
		incrementPage,
	});

	const tweetsList = isLoading
		? "loading..."
		: !data || !data.data
		? "no tweet"
		: data?.data.map((tweet, index) => {
				if (index !== data.data.length - 1) {
					return <TweetCard key={tweet._id} tweet={tweet} />;
				}
				return (
					<TweetCard
						ref={lastTweetRef}
						key={tweet._id}
						tweet={tweet}
					/>
				);
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  });

	return (
		<>
			<Container
				sx={{
					maxWidth: { xs: "xs", normal_sm: "sm", md: "88%" },
					px: { xs: 0, sm: 3 },
				}}
			>
				{tweetsList}
			</Container>
		</>
	);
}
