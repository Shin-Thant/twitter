import { Owner, Tweet } from "../tweet/tweetTypes";

interface GetCommentsTweet {
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
	tweet: string | Tweet | GetCommentsTweet;
	origin?: CommentOrigin;
	likes: string[];
	comments: (Comment | ListResultComment)[];
	createdAt: string;
	updatedAt: string;
}

export interface CommentOrigin extends Comment {
	tweet: string;
	owner: Owner;
	origin?: CommentOrigin;
	comments: ListResultComment[];
}

export interface CreateResultComment extends Comment {
	owner: string;
	tweet: string;
}

export interface ListResultComment extends Comment {
	owner: Owner;
	tweet: GetCommentsTweet;
	comments: ListResultComment[];
}
