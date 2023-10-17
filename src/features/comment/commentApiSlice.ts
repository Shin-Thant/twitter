import { createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import {
	DefaultComment,
	DefaultCommentWithPopulatedUser,
	DefaultReply,
	GetCommentsResultComment,
} from "./commentTypes";
import { RootState } from "../../app/store";

type AddCommentArg = { tweetId: string; body: string };
type LikeCommentArg = { likes: string[]; tweetId: string; commentId: string };
type ReplyCommentArg = { tweetId: string; commentId: string; body: string };
type GetCommentByIdArg = { tweetId: string; commentId: string };
type UpdateCommentArg = { tweetId: string; commentId: string; body: string };

const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getComments: builder.query<
			GetCommentsResultComment[],
			{ tweetId: string }
		>({
			query: ({ tweetId }) => `/tweets/${tweetId}/comments`,
			providesTags: (result, _error, { tweetId }) => {
				if (!result) {
					return [{ type: "Comments", id: `/${tweetId}/LIST` }];
				}
				return [
					...result.map((comment) => ({
						type: "Comments" as const,
						id: `/${tweetId}/${comment._id}`,
					})),
					{ type: "Comments", id: `/${tweetId}/LIST` },
				];
			},
		}),

		getCommentById: builder.query<
			DefaultCommentWithPopulatedUser,
			GetCommentByIdArg
		>({
			query: ({ commentId }) => `/comments/${commentId}`,
			providesTags: (_result, _error, { tweetId, commentId }) => [
				{ type: "Comments", id: `/${tweetId}/${commentId}` },
			],
		}),

		addComment: builder.mutation<DefaultComment, AddCommentArg>({
			query: ({ body, tweetId }) => ({
				url: `/tweets/${tweetId}/comments`,
				method: "POST",
				body: {
					body,
				},
			}),
			invalidatesTags: (_res, _err, { tweetId }) => [
				{ type: "Comments", id: `/${tweetId}/LIST` },
				{ type: "Tweets", id: tweetId },
			],
		}),

		likeComment: builder.mutation<DefaultComment, LikeCommentArg>({
			query: (arg) => ({
				url: `/comments/${arg.commentId}/likes`,
				method: "PUT",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const result = dispatch(
					commentApiSlice.util.updateQueryData(
						"getComments",
						{ tweetId: arg.tweetId },
						(draft) => {
							const foundComment = draft.find(
								(comment) => comment._id === arg.commentId
							);
							if (foundComment) {
								foundComment.likes = arg.likes;
							}
						}
					)
				);

				try {
					await queryFulfilled;
				} catch (err) {
					result.undo();
				}
			},
		}),

		replyComment: builder.mutation<DefaultReply, ReplyCommentArg>({
			query: ({ commentId, body }) => ({
				url: `/comments/${commentId}/reply`,
				method: "POST",
				body: {
					body,
				},
			}),
			invalidatesTags: (_res, _err, { tweetId }) => [
				{ type: "Comments", id: `/${tweetId}/LIST` },
			],
		}),

		updateComment: builder.mutation<DefaultReply, UpdateCommentArg>({
			query: ({ commentId, body }) => ({
				url: `/comments/${commentId}`,
				method: "PUT",
				body: {
					body,
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const result = dispatch(
					commentApiSlice.util.updateQueryData(
						"getComments",
						{ tweetId: arg.tweetId },
						(draft) => {
							const foundComment = draft.find(
								(comment) => comment._id === arg.commentId
							);
							if (foundComment) {
								foundComment.body = arg.body;
							}
						}
					)
				);

				try {
					await queryFulfilled;
				} catch (err) {
					result.undo();
				}
			},
		}),
	}),
});

const getCommentsResultSelector = createSelector(
	[
		(state: RootState) => state,
		(_: RootState, tweetId?: string) => {
			if (!tweetId) return null;
			return commentApiSlice.endpoints.getComments.select({ tweetId });
		},
	],
	(state, res) => {
		return res?.(state);
	}
);

const getCommentsDataSelector = createSelector(
	[getCommentsResultSelector],
	(getCommentsResult) => {
		return getCommentsResult?.data;
	}
);

export const selectCommentFromGetComments = createSelector(
	[
		getCommentsDataSelector,
		(_state: RootState, _tweetId?: string, commentId?: string) => commentId,
	],
	(data, commentId) => {
		if (!data || !commentId) {
			return null;
		}
		return data.find((comment) => comment._id === commentId);
	}
);

export const {
	useGetCommentsQuery,
	useGetCommentByIdQuery,
	useAddCommentMutation,
	useLikeCommentMutation,
	useReplyCommentMutation,
	useUpdateCommentMutation,
} = commentApiSlice;
