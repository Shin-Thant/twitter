import apiSlice from "../../app/api/apiSlice";

const commentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addComment: builder.mutation<string, { tweetId: string; body: string }>(
			{
				query: (arg) => ({
					url: "/comments",
					method: "POST",
					body: arg,
				}),
				invalidatesTags: (_res, _err, arg) => [
					{ type: "Tweets", id: arg.tweetId },
				],
			}
		),
	}),
});

export const { useAddCommentMutation } = commentApiSlice;
