import { CommonTweet, DefaultTweet, Owner, Tweet } from "../tweet/tweetTypes";
import { CommonUser, DefaultUser } from "../user/userTypes";

interface GetCommentsResultTweet {
	_id: string;
	owner: {
		_id: string;
		username: string;
	};
}

export interface Comment {
	_id: string;
	body: string;
	owner: string | Owner | { _id: string; username: string };
	tweet: string | Tweet | GetCommentsResultTweet;
	origin?: string | CommentOrigin;
	likes: string[];
	comments?: (string | Comment | ListResultComment)[];
	createdAt: string;
	updatedAt: string;
}

export interface CommentOrigin extends Comment {
	tweet: string;
	owner: Owner;
}

export interface CreateResultComment extends Comment {
	owner: string;
	tweet: string;
}

export interface ListResultComment extends Comment {
	owner: Owner;
	tweet: GetCommentsResultTweet;
	origin: CommentOrigin;
	comments: ListResultComment[];
}

export interface CreateReplyResult extends Comment {
	tweet: string;
	origin: string;
	owner: string;
	comments: string[];
}

export interface GetCommentByIdResult extends Comment {
	tweet: string;
	origin: string;
	owner: {
		_id: string;
		username: string;
	};
	comments: string[];
}

// ============================================================
export interface CommonComment {
	_id: string;
	body: string;
	owner: string | CommonUser | DefaultUser;
	tweet: string | CommonTweet | DefaultTweet;
	origin?: string | CommonComment;
	likes: string[];
	comments?: (string | CommonComment)[];
	createdAt: string;
	updatedAt: string;
}
export type DefaultComment = Omit<CommonComment, "comments"> & {
	origin?: string;
	tweet: string;
	owner: string;
};
