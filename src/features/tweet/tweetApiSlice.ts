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

type Res = {
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
			Res,
			{ itemsPerPage: number; currentPage: number }
		>({
			query: ({ itemsPerPage, currentPage }) =>
				`/tweets?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`,
			providesTags: (result, error, page) => {
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
	}),
});

export const { useGetTweetsQuery } = tweetApiSlice;
export default tweetApiSlice;
