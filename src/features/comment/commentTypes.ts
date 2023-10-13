import { Owner, Tweet } from "../tweet/tweetTypes";

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
	owner: string | Owner;
	tweet: string | Tweet | GetCommentsResultTweet;
	origin?: string | CommentOrigin;
	likes: string[];
	comments: (string | Comment | ListResultComment)[];
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
