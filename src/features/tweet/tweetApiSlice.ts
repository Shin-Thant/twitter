import { createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import { RootState } from "../../app/store";
import { GetTweetsData, GetTweetsResponse, Tweet } from "./tweetTypes";
import { currentPageSelector } from "../currentPageSlice";

type GetTweetsQueryArg = { itemsPerPage: number; currentPage: number };
type CreateTweetMutationArg = FormData;
type EditTweetMutationArg = { tweetId: string; body: FormData };
type LikeMutationArg = { tweetId: string; likes: string[] };
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

		editTweet: builder.mutation<Tweet, EditTweetMutationArg>({
			query: ({ body, tweetId }) => ({
				method: "PUT",
				url: `/tweets/${tweetId}`,
				body,
			}),
			invalidatesTags(_res, _err, arg) {
				return [{ type: "Tweets", id: arg.tweetId }];
			},
			// async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
			// 	const rootState = getState() as RootState;
			// 	const cacheKey = currentPageSelector(rootState, "tweet");

			// 	const result = dispatch(
			// 		optimisticEditUpdate({ ...arg, cacheKey })
			// 	);

			// 	try {
			// 		await queryFulfilled;
			// 	} catch (err) {
			// 		result.undo();
			// 	}
			// },
		}),

		handleLikes: builder.mutation<Tweet, LikeMutationArg>({
			query: ({ tweetId }) => ({
				method: "PATCH",
				url: `/tweets/${tweetId}/like`,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
				const rootState = getState() as RootState;
				const cacheKey = currentPageSelector(rootState, "tweet");

				const result = dispatch(
					optimisticLikeUpdate({ ...arg, cacheKey })
				);

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
	tweetId,
	likes,
	cacheKey,
}: LikeMutationArg & { cacheKey: number }) => {
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

// TODO: handle this
// const optimisticEditUpdate = ({
// 	body,
// 	tweetId,
// 	cacheKey,
// }: EditTweetMutationArg & { cacheKey: number }) => {
// 	return tweetApiSlice.util.updateQueryData(
// 		"getTweets",
// 		{ currentPage: cacheKey, itemsPerPage: 10 },
// 		(draft) => {
// 			const foundTweet = draft.data.find(
// 				(tweet) => tweet._id === tweetId
// 			);

// 			if (foundTweet) {
// 				foundTweet.body = body;
// 			}
// 		}
// 	);
// };

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

export const selectTweetById = createSelector(
	[dataSelector, (_: RootState, id: string) => id],
	(data, id) => {
		if (!id) {
			return undefined;
		}
		return data?.data.find((tweet) => tweet._id === id);
	}
);

export const {
	useGetTweetsQuery,
	useCreateTweetMutation,
	useEditTweetMutation,
	useHandleLikesMutation,
	useHandleShareMutation,
	useHandleDeleteTweetMutation,
} = tweetApiSlice;

export default tweetApiSlice;
