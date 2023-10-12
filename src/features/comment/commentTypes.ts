import { Owner } from "../tweet/tweetTypes";

export interface Comment {
	_id: string;
	body: string;
	owner: Owner;
	tweet: {
		_id: string;
		owner: {
			_id: string;
			username: string;
		};
	};
	origin?: Comment;
	likes: string[];
	comments: Comment[];
	createdAt: string;
	updatedAt: string;
}
