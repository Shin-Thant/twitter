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
type LikeCommentArg = {
	likes: string[];
	tweetId: string;
	commentId: string;
	getRepliesCacheKey?: string;
};
type ReplyCommentArg = {
	tweetId?: string;
	commentId: string;
	body: string;
	getRepliesCacheKey?: string;
};
type GetCommentByIdArg = { tweetId: string; commentId: string };
type UpdateCommentArg = {
	tweetId?: string;
	commentId: string;
	body: string;
	originIdOrGetRepliesCacheKey?: string;
};
type DeleteCommentResponse = { message: string };
type DeleteCommentArg = {
	tweetId?: string;
	commentId: string;
	originIdOrGetRepliesCacheKey?: string;
};

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
					{ type: "Comments", id: `/${tweetId}/LIST` },
					{ type: "Tweets", id: tweetId },
					{ type: "TweetDetails", id: tweetId },
				] as const;
				if (!result) {
					return tags;
				}
				return [
					...tags,
					{
						type: "Replies",
						id: `/${result._id}/LIST`,
					},
				];
			},
		}),

		likeComment: builder.mutation<DefaultComment, LikeCommentArg>({
			query: (arg) => ({
				url: `/comments/${arg.commentId}/likes`,
				method: "PUT",
			}),
			async onQueryStarted(
				{ commentId, likes, tweetId, getRepliesCacheKey },
				{ dispatch, queryFulfilled }
			) {
				const getCommentsUpdateResult = dispatch(
					commentApiSlice.util.updateQueryData(
						"getComments",
						{ tweetId },
						(draft) => {
							const foundComment = draft.find(
								(comment) => comment._id === commentId
							);

							if (foundComment) {
								foundComment.likes = likes;
								return;
							}

							draft.forEach((comment) => {
								const foundReply = comment?.comments?.find(
									(reply) => reply._id === commentId
								);
								if (foundReply) {
									foundReply.likes = likes;
								}
							});
						}
					)
				);

				let getRepliesUpdateResult = undefined;
				if (getRepliesCacheKey) {
					getRepliesUpdateResult = dispatch(
						commentApiSlice.util.updateQueryData(
							"getCommentReplies",
							{ commentId: getRepliesCacheKey },
							(draft) => {
								const foundReply = draft.find(
									(reply) => reply._id === commentId
								);
								if (foundReply) {
									foundReply.likes = likes;
									return;
								}

								draft.forEach((reply) => {
									const nestedReply = reply.comments?.find(
										(nestedReply) =>
											nestedReply._id === commentId
									);
									if (nestedReply) {
										nestedReply.likes = likes;
									}
								});
							}
						)
					);
				}

				try {
					await queryFulfilled;
				} catch (err) {
					getCommentsUpdateResult.undo();
					getRepliesUpdateResult?.undo();
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
			invalidatesTags: (_res, _err, { tweetId, getRepliesCacheKey }) => {
				const tags: {
					type: "Comments" | "Replies";
					id: string;
				}[] = [];

				if (tweetId) {
					tags.push({ type: "Comments", id: `/${tweetId}/LIST` });
				}
				if (getRepliesCacheKey) {
					tags.push({
						type: "Replies",
						id: `/${getRepliesCacheKey}/LIST`,
					});
				}
				console.log(tags);

				return tags;
			},
		}),

		updateComment: builder.mutation<DefaultReply, UpdateCommentArg>({
			query: ({ commentId, body }) => ({
				url: `/comments/${commentId}`,
				method: "PUT",
				body: {
					body,
				},
			}),
			async onQueryStarted(
				{ tweetId, commentId, body, originIdOrGetRepliesCacheKey },
				{ dispatch, queryFulfilled }
			) {
				let getCommentsUpdateResult;
				if (tweetId) {
					getCommentsUpdateResult = dispatch(
						commentApiSlice.util.updateQueryData(
							"getComments",
							{ tweetId },
							(draft) => {
								// find comment and update
								const foundComment = draft.find(
									(comment) => comment._id === commentId
								);
								if (foundComment) {
									foundComment.body = body;
									return;
								}

								// find nested comment and update
								draft.forEach((comment) => {
									const reply = comment.comments.find(
										(reply) => reply._id === commentId
									);
									if (reply) {
										reply.body = body;
										return;
									}
								});
							}
						)
					);
				}

				let getRepliesUpdateResult;
				if (originIdOrGetRepliesCacheKey) {
					getRepliesUpdateResult = dispatch(
						commentApiSlice.util.updateQueryData(
							"getCommentReplies",
							{ commentId: originIdOrGetRepliesCacheKey },
							(draft) => {
								// find reply and update
								const foundReply = draft.find(
									(reply) => reply._id === commentId
								);
								if (foundReply) {
									foundReply.body = body;
									return;
								}

								console.log("updating nested reply", {
									update: commentId,
								});

								// find nested comment and update
								draft.forEach((reply) => {
									const nestedReply = reply?.comments?.find(
										(reply) => reply._id === commentId
									);
									if (nestedReply) {
										nestedReply.body = body;
										return;
									}
								});
							}
						)
					);
				}

				console.log({
					getCommentsUpdateResult,
					getRepliesUpdateResult,
				});

				try {
					await queryFulfilled;
				} catch (err) {
					getCommentsUpdateResult?.undo();
					getRepliesUpdateResult?.undo();
				}
			},
		}),

		deleteComment: builder.mutation<
			DeleteCommentResponse,
			DeleteCommentArg
		>({
			query: ({ commentId }) => ({
				url: `/comments/${commentId}`,
				method: "DELETE",
			}),
			invalidatesTags: (
				_res,
				_err,
				{ originIdOrGetRepliesCacheKey, tweetId }
			) => {
				const tags: {
					type: "Comments" | "Replies" | "TweetDetails";
					id: string;
				}[] = [];

				if (tweetId) {
					tags.push({ type: "TweetDetails", id: tweetId });
					tags.push({
						type: "Comments",
						id: `/${tweetId}/LIST`,
					});
				}
				if (originIdOrGetRepliesCacheKey) {
					tags.push({
						type: "Replies",
						id: `/${originIdOrGetRepliesCacheKey}/LIST`,
					});
				}

				return tags;
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
	useDeleteCommentMutation,
} = commentApiSlice;
