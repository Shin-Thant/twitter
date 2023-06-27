import apiSlice from "../../app/api/apiSlice";
import { GetTweetsResponse, Tweet } from "./tweetTypes";

type LikeMutationArg = { tweetId: string; likes: string[]; cacheKey: number };
type ShareMutationArg = { tweetId: string; body?: string };
type DeleteMutationArg = { tweetId: string };

const tweetApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTweets: builder.query<
			GetTweetsResponse,
			{ itemsPerPage: number; currentPage: number }
		>({
			query: ({ itemsPerPage, currentPage }) => {
				return `/tweets?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`;
			},
			// transformResponse(result) {
			// 	console.log(result);
			// 	return result;
			// },
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
			// invalidatesTags: (_result, _error, arg) => [
			// 	{ type: "Tweets", id: "LIST" },
			// ],
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
			query: ({ tweetId, body }) => ({
				url: `/tweets/${tweetId}/share`,
				method: "POST",
				body: { body },
			}),
			// TODO: make update optimistic
			invalidatesTags(_res, _err, arg) {
				return [{ type: "Tweets", id: arg.tweetId }];
			},
		}),

		handleDeleteTweet: builder.mutation<
			{ message: string },
			DeleteMutationArg
		>({
			query: ({ tweetId }) => ({
				url: `/tweets/${tweetId}`,
				method: "DELETE",
			}),
			invalidatesTags(_res, _err, arg) {
				return [{ type: "Tweets", id: arg.tweetId }];
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
	useHandleDeleteTweetMutation,
} = tweetApiSlice;
export default tweetApiSlice;
