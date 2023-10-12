import { Owner } from "../tweet/tweetTypes";

export interface Comment {
	_id: string;
	body: string;
	owner: Owner;
	tweet: string;
	parent?: string;
	likes: string[];
	comments?: Comment[];
	createdAt: string;
	updatedAt: string;
}
