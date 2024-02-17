import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TweetCard from "../components/cards/tweet-card/TweetCard";
import {
	currentPageSelector,
	setTweetCurrentPage,
} from "../features/currentPageSlice";
import { useGetTweetsQuery } from "../features/tweet/tweetApiSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { NewPostPushContainer } from "./NewPostPushContainer";

export default function TweetsContainer() {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector((state) =>
		currentPageSelector(state, "tweet")
	);

	const { isLoading, isFetching, data, refetch } = useGetTweetsQuery(
		{ itemsPerPage: 10, currentPage: currentPage },
		{
			pollingInterval: 30 * 60 * 1000,
			refetchOnReconnect: true,
			refetchOnMountOrArgChange: true,
			skip: currentPage < 1,
		}
	);

	const incrementPage = useCallback(() => {
		dispatch(setTweetCurrentPage());
	}, [dispatch]);

	const lastTweetRef = useInfiniteScroll({
		isFetching,
		hasNextPage: data?.pagination.hasNextPage ?? false,
		incrementPage,
	});

	const tweetsList = isLoading
		? "loading..."
		: !data || !data.data.length
		? "no tweet"
		: data.data.map((tweet, index) => {
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
		<NewPostPushContainer refetch={refetch}>
			{tweetsList}
			{isFetching && "Loading..."}
		</NewPostPushContainer>
	);
}
