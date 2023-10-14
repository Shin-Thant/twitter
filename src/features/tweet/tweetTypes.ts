import { Comment } from "../comment/commentTypes";
import { User } from "../user/userTypes";

export type Owner = Omit<User, "email" | "followers">;

export type NestedTweetPreview = {
	_id: string;
	origin: string;
	body: string;
	owner: string;
	type: "post" | "share";
};

interface BasicTweet {
	_id: string;
	body?: string;
	owner: Owner;
	images: string[];
	likes: string[];
	comments: Comment[];
	shares: NestedTweetPreview[];
	createdAt: string;
	updatedAt: string;
}
interface PostTweet extends BasicTweet {
	type: "post";
}
export interface SharedTweet extends BasicTweet {
	type: "share";
	origin: OriginTweet;
}
interface OriginTweet extends BasicTweet {
	type: "post" | "share";
	origin: string;
	owner: Owner;
}

export type Tweet = PostTweet | SharedTweet;

export interface Pagination {
	totalPages: number;
	totalDocs: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	currentPage: number;
	limit: number;
}
export interface GetTweetsResponse extends Pagination {
	data: Tweet[];
}

export interface GetTweetsData {
	pagination: Pagination;
	data: Tweet[];
}

export interface TweetDetailComment extends Comment {
	owner: Owner;
	tweet: string;
	comments: TweetDetailComment[];
	origin: string;
}
export type GetTweetByIdResult = Tweet & {
	comments: TweetDetailComment[];
};
