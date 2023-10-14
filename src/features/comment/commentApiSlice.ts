import apiSlice from "../../app/api/apiSlice";
import {
	Comment,
	CreateReplyResult,
	GetCommentByIdResult,
	ListResultComment,
} from "./commentTypes";

type AddCommentArg = { tweetId: string; body: string };
type LikeCommentArg = { likes: string[]; tweetId: string; commentId: string };
type ReplyCommentArg = { tweetId: string; commentId: string; body: string };
type GetCommentByIdArg = { tweetId: string; commentId: string };

const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getComments: builder.query<ListResultComment[], { tweetId: string }>({
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

		getCommentById: builder.query<GetCommentByIdResult, GetCommentByIdArg>({
			query: ({ commentId }) => `/comments/${commentId}`,
			providesTags: (_result, _error, { tweetId, commentId }) => [
				{ type: "Comments", id: `/${tweetId}/${commentId}` },
			],
		}),

		addComment: builder.mutation<Comment, AddCommentArg>({
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

		likeComment: builder.mutation<Comment, LikeCommentArg>({
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

		replyComment: builder.mutation<CreateReplyResult, ReplyCommentArg>({
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
	}),
});

export const {
	useGetCommentsQuery,
	useGetCommentByIdQuery,
	useAddCommentMutation,
	useLikeCommentMutation,
	useReplyCommentMutation,
} = commentApiSlice;
