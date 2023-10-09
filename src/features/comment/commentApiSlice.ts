import apiSlice from "../../app/api/apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addComment: builder.mutation<string, { tweetId: string; body: string }>(
			{
				query: ({ body, tweetId }) => ({
					url: `/tweets/${tweetId}/comments`,
					method: "POST",
					body: {
						body,
					},
				}),
				invalidatesTags: (_res, _err, arg) => [
					{ type: "Tweets", id: arg.tweetId },
				],
			}
		),
	}),
});

export const { useAddCommentMutation } = commentApiSlice;
