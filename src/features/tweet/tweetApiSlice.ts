import apiSlice from "../../app/api/apiSlice";
import { GetTweetsResponse, Tweet } from "./types";

type LikeMutationArg = { tweetId: string; likes: string[]; cacheKey: number };
type ShareMutationArg = { tweetId: string; body?: string };

const tweetApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTweets: builder.query<
			GetTweetsResponse,
			{ itemsPerPage: number; currentPage: number }
		>({
			query: ({ itemsPerPage, currentPage }) => {
				return `/tweets?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`;
			},
			providesTags: (result) => {
				if (!result) {
					return [{ type: "Tweets", id: "LIST" }];
				}
				return [
					...result.data.map((tweet) => ({
						type: "Tweets" as const,
						id: tweet._id,
					})),
					{ type: "Tweets", id: "LIST" },
				];
			},
		}),

		handleLikes: builder.mutation<Tweet, LikeMutationArg>({
			query: ({ tweetId }) => ({
				method: "PATCH",
				url: `/tweets/${tweetId}/like`,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const result = dispatch(optimisticLikeUpdate(arg));

				try {
					await queryFulfilled;
				} catch (err) {
					result.undo();
				}
			},
		}),

		handleShare: builder.mutation<Tweet, ShareMutationArg>({
			query: ({ tweetId, body }) => {
				const req = {
					url: `/tweets/${tweetId}/share`,
					method: "POST",
				};
				if (!body) {
					return req;
				}
				return {
					...req,
					body,
				};
			},
		}),
	}),
});

const optimisticLikeUpdate = ({
	cacheKey,
	tweetId,
	likes,
}: LikeMutationArg) => {
	return tweetApiSlice.util.updateQueryData(
		"getTweets",
		{ currentPage: cacheKey, itemsPerPage: 10 },
		(draft) => {
			const foundTweet = draft.data.find(
				(tweet) => tweet._id === tweetId
			);

			if (foundTweet) {
				foundTweet.likes = likes;
			}
		}
	);
};

export const {
	useGetTweetsQuery,
	useHandleLikesMutation,
	useHandleShareMutation,
} = tweetApiSlice;
export default tweetApiSlice;
