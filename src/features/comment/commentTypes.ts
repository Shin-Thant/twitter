import { CommonTweet, DefaultTweet } from "../tweet/tweetTypes";
import { CommonUser, DefaultUser, UserWithoutEmail } from "../user/userTypes";

export interface CommonComment {
	type: "comment" | "reply";
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
	comments?: ({ _id: string } | CommonComment | GetCommentsResultReply)[];
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
	type: "comment";
	origin?: DefaultCommentWithPopulatedUser;
	owner: UserWithoutEmail;
	tweet: GetCommentsResultTweet;
	comments: (GetCommentsResultReply | GetCommentsResultIntroReply)[];
}
export type GetCommentsResultTweet = Pick<DefaultTweet, "owner" | "_id"> & {
	owner: DefaultUser;
};

export type GetCommentsResultReply = DefaultComment & {
	type: "reply";
	origin: DefaultComment & { owner: UserWithoutEmail };
	owner: UserWithoutEmail;
	comments?: (GetCommentsResultReply | GetCommentsResultIntroReply)[];
};

export type GetCommentsResultIntroReply = GetCommentsResultReply & {
	comments?: { type: "reply"; _id: string; owner: UserWithoutEmail }[];
};
