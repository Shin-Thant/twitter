import apiSlice from "../../app/api/apiSlice";
import { GetTweetsResponse, Tweet } from "./type";

const tweetApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTweets: builder.query<
			GetTweetsResponse,
			{ itemsPerPage: number; currentPage: number }
		>({
			query: ({ itemsPerPage, currentPage }) => {
				return `/tweets?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`;
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
		handleLikes: builder.mutation<
			Tweet,
			{ tweetId: string; likes: string[]; cacheKey: number }
		>({
			query: ({ tweetId }) => ({
				method: "PATCH",
				url: `/tweets/${tweetId}/like`,
			}),
			async onQueryStarted(
				{ tweetId, likes, cacheKey },
				{ dispatch, queryFulfilled }
			) {
				const result = dispatch(
					tweetApiSlice.util.updateQueryData(
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
					)
				);

				try {
					await queryFulfilled;
				} catch (err) {
					console.log(err);

					result.undo();
				}
			},
		}),
	}),
});

export const { useGetTweetsQuery, useHandleLikesMutation } = tweetApiSlice;
export default tweetApiSlice;
