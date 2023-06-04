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
