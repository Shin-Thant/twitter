import { CommonComment, DefaultComment } from "../comment/commentTypes";
import { CommonUser, DefaultUser, UserWithoutEmail } from "../user/userTypes";

export interface CommonTweet {
	type: "post" | "share";
	_id: string;
	body?: string;
	origin?: string | CommonTweet | DefaultTweet;
	owner: string | CommonUser | DefaultUser | GetTweetsUser;
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

export type GetTweetsUser = UserWithoutEmail;
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

export interface GetTweetByIdResultTweet extends CommonTweet {
	owner: UserWithoutEmail;
	comments: GetTweetByIdResultComment[];
	origin: DefaultTweet & { owner: UserWithoutEmail };
	shares: GetTweetByIdResultShares[];
}
export type GetTweetByIdResultShares = GetTweetsResultShare;
type GetTweetByIdResultComment = DefaultComment & { owner: UserWithoutEmail };

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

// ========================================================
