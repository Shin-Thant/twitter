import { createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import { RootState } from "../../app/store";
import { GetTweetsData, GetTweetsResponse, Tweet } from "./tweetTypes";

type GetTweetsQueryArg = { itemsPerPage: number; currentPage: number };
type CreateTweetMutationArg = { body: string };
type LikeMutationArg = { tweetId: string; likes: string[]; cacheKey: number };
type ShareMutationArg = { tweetId: string; body?: string };
type DeleteMutationArg = { tweetId: string };

const tweetApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTweets: builder.query<GetTweetsData, GetTweetsQueryArg>({
			query: ({ itemsPerPage, currentPage }) => {
				return `/tweets?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`;
			},
			transformResponse: (result: GetTweetsResponse) => {
				const { data, ...pagination } = result;

				return {
					pagination,
					data,
				};
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

		createTweet: builder.mutation<Tweet, CreateTweetMutationArg>({
			query: (arg) => ({
				url: "tweets",
				method: "POST",
				body: arg,
			}),
			invalidatesTags: [{ type: "Tweets", id: "LIST" }],
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

const resultSelector = createSelector(
	(state: RootState) => ({
		currentPage: state.currentPage.tweet.currentPage,
		state,
	}),
	({ currentPage, state }: { currentPage: number; state: RootState }) => {
		return tweetApiSlice.endpoints.getTweets.select({
			itemsPerPage: 10,
			currentPage,
		})(state);
	}
);

const dataSelector = createSelector(
	(state: RootState) => resultSelector(state),
	(fun) => {
		return fun.data;
	}
);

export const selectById = createSelector(
	[dataSelector, (_: RootState, id: string) => id],
	(data, id) => {
		console.log("getting data");

		return data?.data.find((tweet) => tweet._id === id);
	}
);

const tweetResultSelector = createSelector(
	(state: RootState) => {
		return state.currentPage.tweet.currentPage;
	},
	(cacheKey) => {
		return tweetApiSlice.endpoints.getTweets.select({
			itemsPerPage: 10,
			currentPage: cacheKey,
		});
	}
);

export const {
	useGetTweetsQuery,
	useCreateTweetMutation,
	useHandleLikesMutation,
	useHandleShareMutation,
	useHandleDeleteTweetMutation,
} = tweetApiSlice;

export default tweetApiSlice;
