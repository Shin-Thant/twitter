import { CommonTweet, DefaultTweet } from "../tweet/tweetTypes";
import { CommonUser, DefaultUser, UserWithoutEmail } from "../user/userTypes";

export interface CommonComment {
	_id: string;
	body: string;
	owner:
		| string
		| CommonUser
		| DefaultUser
		| UserWithoutEmail
		| Pick<DefaultUser, "username">;
	tweet: string | CommonTweet | DefaultTweet | GetCommentsResultTweet;
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
export type DefaultReply = DefaultComment & {
	origin: DefaultComment | DefaultReply;
};

export type DefaultCommentWithPopulatedUser = DefaultComment & {
	owner: UserWithoutEmail;
};

export interface GetCommentsResultComment extends CommonComment {
	origin?: DefaultCommentWithPopulatedUser;
	owner: UserWithoutEmail;
	tweet: GetCommentsResultTweet;
	comments: DefaultCommentWithPopulatedUser[];
}
export interface GetCommentsResultTweet
	extends Pick<CommonTweet, "owner" | "_id"> {
	owner: DefaultUser;
}
