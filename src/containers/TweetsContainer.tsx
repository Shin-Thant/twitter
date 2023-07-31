import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import TweetSkeleton from "../components/skeletons/TweetSkeleton";
import TweetCard from "../components/tweet/TweetCard";
import { setTweetCurrentPage } from "../features/currentPageSlice";
import {
	useGetTweetsQuery
} from "../features/tweet/tweetApiSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function TweetsContainer() {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(
		(state) => state.currentPage.tweet.currentPage
	);

	const { isLoading, isFetching, data } = useGetTweetsQuery(
		{ itemsPerPage: 10, currentPage: currentPage },
		{
			pollingInterval: 30 * 60 * 1000,
			refetchOnReconnect: true,
			skip: currentPage < 1,
		}
	);

	useEffect(() => {
		let isMounted = true;

		if(isMounted)console.log({isFetching, isLoading});

		return () => {
			isMounted = false;
		}
		
	}, [isFetching, isLoading])

	const incrementPage = useCallback(() => {
		// setCurrentPage((prev) => prev + 1);
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
		<>
			{tweetsList}
			{isFetching && 'Loading...'}
		</>
	);
}
