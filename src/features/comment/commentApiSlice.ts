import { createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import {
	DefaultComment,
	DefaultCommentWithPopulatedUser,
	DefaultReply,
	GetCommentsResultComment,
	GetCommentsResultReply,
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

		getCommentReplies: builder.query<
			GetCommentsResultReply[],
			{ commentId: string }
		>({
			query: ({ commentId }) => `/comments/${commentId}/replies`,
			providesTags: (result, error, { commentId }) => {
				if (error || !result) {
					return [{ type: "Replies", id: `/${commentId}/LIST` }];
				}
				return [
					...result.map((reply) => ({
						type: "Replies" as const,
						id: `/${commentId}/${reply._id}`,
					})),
					{ type: "Replies", id: `/${commentId}/LIST` },
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
			invalidatesTags: (result, _err, { tweetId }) => {
				const tags = [
					{ type: "Comments", id: `/${tweetId}/LIST` } as const,
					{ type: "Tweets", id: tweetId } as const,
				];
				if (result) {
					return [
						...tags,
						{
							type: "Replies" as const,
							id: `/${result._id}/LIST`,
						},
					];
				}
				return tags;
			},
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
				url: `/comments/${commentId}/replies`,
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
		console.log({ res });

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
	useGetCommentRepliesQuery,
	useGetCommentByIdQuery,
	useAddCommentMutation,
	useLikeCommentMutation,
	useReplyCommentMutation,
	useUpdateCommentMutation,
} = commentApiSlice;
