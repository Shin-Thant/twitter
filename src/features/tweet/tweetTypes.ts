import {
	Comment,
	CommonComment,
	DefaultComment,
} from "../comment/commentTypes";
import { CommonUser, DefaultUser, User } from "../user/userTypes";

export interface CommonTweet {
	type: "post" | "share";
	_id: string;
	body?: string;
	origin?: string | CommonTweet | DefaultTweet;
	owner: string | CommonTweet | DefaultUser | GetTweetsUser;
	images: string[];
	likes: string[];
	comments?: (CommonComment | DefaultComment | GetTweetsResultComment)[];
	shares: (string | CommonTweet | DefaultTweet | GetTweetsResultShare)[];
	createdAt: string;
	updatedAt: string;
}
export type DefaultTweet = Omit<CommonTweet, "comments"> & {
	origin?: string;
	owner: string;
	shares: string[];
};

export type GetTweetsUser = Omit<CommonUser, "email">;
export interface GetTweetsResultTweet extends CommonTweet {
	origin?: GetTweetsResultOrigin;
	owner: GetTweetsUser;
	shares: GetTweetsResultShare[];
	comments: GetTweetsResultComment[];
}
export type GetTweetsResultComment = DefaultComment & {
	owner: GetTweetsUser;
};
export interface GetTweetsResultShare
	extends Pick<CommonTweet, "_id" | "type" | "origin" | "body" | "owner"> {
	origin: DefaultTweet;
	body?: string;
	owner: string;
}
export type GetTweetsResultOrigin = DefaultTweet & {
	owner: GetTweetsUser;
};

// ========================================================

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

export type TweetCardType = Tweet & { comments: TweetCardComment[] };
export interface TweetCardComment extends Comment {
	owner: Owner;
	origin?: string;
	tweet: string;
	comments?: string[];
}

export interface Pagination {
	totalPages: number;
	totalDocs: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	currentPage: number;
	limit: number;
}

export interface GetTweetsResponse extends Pagination {
	data: GetTweetsResultTweet[];
}

export interface GetTweetsResult {
	pagination: Pagination;
	data: GetTweetsResultTweet[];
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
