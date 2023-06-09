import { User } from "../user/types";

export type Owner = Omit<User, "email" | "id">;
interface BasicTweet {
	_id: string;
	body: string;
	owner: Owner;
	likes: string[];
	comments: { creator: Owner }[];
	shares: string[];
	createdAt: string;
	updatedAt: string;
}
interface PostTweet extends BasicTweet {
	type: "post";
}
interface SharedTweet extends BasicTweet {
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

export type GetTweetsResponse = {
	totalPages: number;
	totalDocs: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	currentPage: number;
	limit: number;
	data: Tweet[];
};
