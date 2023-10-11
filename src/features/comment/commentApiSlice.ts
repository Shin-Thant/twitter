import apiSlice from "../../app/api/apiSlice";
import { Comment } from "./commentTypes";

const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getComments: builder.query<Comment[], { tweetId: string }>({
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

		addComment: builder.mutation<string, { tweetId: string; body: string }>(
			{
				query: ({ body, tweetId }) => ({
					url: `/tweets/${tweetId}/comments`,
					method: "POST",
					body: {
						body,
					},
				}),
				invalidatesTags: (_res, _err, { tweetId }) => [
					{ type: "Comments", id: `/${tweetId}/LIST` },
				],
			}
		),

		likeComment: builder.mutation<
			Comment,
			{ lkes: string[]; tweetId: string; commentId: string }
		>({
			query: (arg) => ({
				url: `/comments/${arg.commentId}/likes`,
				method: "PUT",
			}),
			invalidatesTags: (_res, _err, { tweetId, commentId }) => [
				{
					type: "Comments",
					id: `/${tweetId}/${commentId}`,
				},
			],
		}),
	}),
});

export const {
	useGetCommentsQuery,
	useAddCommentMutation,
	useLikeCommentMutation,
} = commentApiSlice;
