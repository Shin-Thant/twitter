import apiSlice from "../../app/api/apiSlice";
import { User } from "../user/userSlice";

export type Owner = Omit<User, "email" | "id">;
export interface BasicTweet {
	_id: string;
	body: string;
	owner: Owner;
	likes: string[];
	createdAt: string;
	updatedAt: string;
	comments: string[];
	shares: number;
}
export interface PostTweet extends BasicTweet {
	type: "post";
}
export interface SharedTweet extends BasicTweet {
	type: "share";
	origin: {
		type: "post" | "share";
		_id: string;
		body: string;
		owner: {
			_id: string;
			username: string;
			name: string;
			following: string[];
			avatar: string;
			counts: {
				following: number;
				followers: number;
			};
		};
		createdAt: string;
		updatedAt: string;
	};
}
export type Tweet = PostTweet | SharedTweet;

type GetTweetsResponse = {
	totalPages: number;
	totalDocs: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	currentPage: number;
	limit: number;
	data: Tweet[];
};

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
