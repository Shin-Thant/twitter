import { createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import { RootState } from "../../app/store";
import { currentPageSelector } from "../currentPageSlice";
import {
	DefaultTweet,
	GetTweetByIdResultTweet,
	GetTweetsResponse,
	GetTweetsResult,
} from "./tweetTypes";

type GetTweetsQueryArg = { itemsPerPage: number; currentPage: number };
type GetTweetByIdQueryArg = { tweetId: string };
type CreateTweetMutationArg = FormData;
type EditTweetMutationArg = {
	tweetId: string;
	body: FormData;
};
type LikeMutationArg = { tweetId: string; likes: string[] };
type ShareMutationArg = { tweetId: string; body?: FormData };
type DeleteMutationArg = { tweetId: string };

const tweetApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTweets: builder.query<GetTweetsResult, GetTweetsQueryArg>({
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

		getTweetById: builder.query<
			GetTweetByIdResultTweet,
			GetTweetByIdQueryArg
		>({
			query: ({ tweetId }) => {
				return `/tweets/${tweetId}`;
			},
			providesTags: (_result, _error, arg) => {
				return [
					{ type: "TweetDetails", id: arg.tweetId },
					{ type: "TweetDetails", id: "LIST" },
				];
			},
		}),

		createTweet: builder.mutation<DefaultTweet, CreateTweetMutationArg>({
			query: (arg) => ({
				url: "tweets",
				method: "POST",
				body: arg,
			}),
			invalidatesTags: [{ type: "Tweets", id: "LIST" }],
		}),

		editTweet: builder.mutation<DefaultTweet, EditTweetMutationArg>({
			query: ({ body, tweetId }) => ({
				method: "PUT",
				url: `/tweets/${tweetId}`,
				body,
			}),
			// TODO: invalidate only when image changes
			invalidatesTags(_res, _err, arg) {
				return [
					{ type: "Tweets", id: arg.tweetId },
					{ type: "TweetDetails", id: arg.tweetId },
				];
			},
			async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
				const rootState = getState() as RootState;
				const cacheKey = currentPageSelector(rootState, "tweet");

				const getTweetsOptimisticResult = dispatch(
					getTweetsOptimisticEditUpdate({ ...arg, cacheKey })
				);
				const getTweetByIdOptimisticResult = dispatch(
					getTweetByIdOptimisticEditUpdate({ ...arg })
				);

				try {
					await queryFulfilled;
				} catch (err) {
					getTweetsOptimisticResult.undo();
					getTweetByIdOptimisticResult.undo();
				}
			},
		}),

		handleLikes: builder.mutation<DefaultTweet, LikeMutationArg>({
			query: ({ tweetId }) => ({
				method: "PATCH",
				url: `/tweets/${tweetId}/like`,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
				const rootState = getState() as RootState;
				const cacheKey = currentPageSelector(rootState, "tweet");

				const getTweetsOptimisticResult = dispatch(
					getTweetsOptimisticLikeUpdate({ ...arg, cacheKey })
				);
				const getTweetByIdOptimisticResult = dispatch(
					getTweetByIdOptimisticLikeUpdate({ ...arg })
				);

				try {
					await queryFulfilled;
				} catch (err) {
					getTweetsOptimisticResult.undo();
					getTweetByIdOptimisticResult.undo();
				}
			},
		}),

		shareTweet: builder.mutation<DefaultTweet, ShareMutationArg>({
			query: ({ tweetId, body }) => ({
				url: `/tweets/${tweetId}/share`,
				method: "POST",
				body,
			}),
			// TODO: make update optimistic
			invalidatesTags(_res, _err, arg) {
				return [
					{ type: "Tweets", id: arg.tweetId },
					{ type: "TweetDetails", id: arg.tweetId },
				];
			},
		}),

		deleteTweet: builder.mutation<{ message: string }, DeleteMutationArg>({
			query: ({ tweetId }) => ({
				url: `/tweets/${tweetId}`,
				method: "DELETE",
			}),
			invalidatesTags(_res, _err, arg) {
				return [
					{ type: "Tweets", id: arg.tweetId },
					{ type: "TweetDetails", id: arg.tweetId },
				];
			},
		}),
	}),
});

const getTweetsOptimisticLikeUpdate = ({
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

const getTweetByIdOptimisticLikeUpdate = ({
	tweetId,
	likes,
}: LikeMutationArg) => {
	return tweetApiSlice.util.updateQueryData(
		"getTweetById",
		{ tweetId },
		(draft) => {
			draft.likes = likes;
		}
	);
};

const getTweetsOptimisticEditUpdate = ({
	body,
	tweetId,
	cacheKey,
}: EditTweetMutationArg & { cacheKey: number }) => {
	return tweetApiSlice.util.updateQueryData(
		"getTweets",
		{ currentPage: cacheKey, itemsPerPage: 10 },
		(draft) => {
			const tweetBody = body.get("body");

			const foundTweet = draft.data.find(
				(tweet) => tweet._id === tweetId
			);

			if (foundTweet && !!tweetBody && typeof tweetBody === "string") {
				foundTweet.body = tweetBody;
			}
		}
	);
};
const getTweetByIdOptimisticEditUpdate = ({
	body,
	tweetId,
}: EditTweetMutationArg) => {
	return tweetApiSlice.util.updateQueryData(
		"getTweetById",
		{ tweetId },
		(draft) => {
			const tweetBody = body.get("body");

			if (!!tweetBody && typeof tweetBody === "string") {
				draft.body = tweetBody;
			}
		}
	);
};

const getTweetsResultSelector = createSelector(
	(state: RootState) => ({
		currentPage: state.currentPage.tweet.currentPage,
		state,
	}),
	({ currentPage, state }) => {
		return tweetApiSlice.endpoints.getTweets.select({
			itemsPerPage: 10,
			currentPage,
		})(state);
	}
);

const getTweetsDataSelector = createSelector(
	(state: RootState) => getTweetsResultSelector(state),
	(getTweetsResult) => {
		if (!getTweetsResult.data) return null;
		return getTweetsResult.data;
	}
);

export const selectTweetFromGetTweets = createSelector(
	[getTweetsDataSelector, (_: RootState, id: string) => id],
	(data, id) => {
		if (!id) {
			return null;
		}
		return data?.data.find((tweet) => tweet._id === id);
	}
);

export const {
	useGetTweetsQuery,
	useGetTweetByIdQuery,
	useCreateTweetMutation,
	useEditTweetMutation,
	useHandleLikesMutation,
	useShareTweetMutation,
	useDeleteTweetMutation,
} = tweetApiSlice;

export default tweetApiSlice;
