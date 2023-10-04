import { Owner } from "../tweet/tweetTypes";
import { User } from "../user/userTypes";

export interface Comment {
	_id: string;
	body: string;
	creator: Owner;
	tweet: string;
	parent?: string;
	comments?: Comment[];
}
