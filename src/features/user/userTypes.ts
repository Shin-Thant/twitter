export interface CommonUser {
	_id: string;
	name: string;
	username: string;
	email: string;
	emailVerified: boolean;
	avatar?: string;
	followers?: (string | CommonUser)[];
	following: (string | CommonUser)[];
	counts: {
		followers: number;
		following: number;
	};
	createdAt: string;
	updatedAt: string;
	id: string;
}

export type DefaultUser = Omit<CommonUser, "followers"> & {
	folowing: string[];
};

export type NotiTriggerUser = Pick<
	CommonUser,
	"_id" | "avatar" | "username" | "name"
>;

export type UserWithoutEmail = Omit<DefaultUser, "email">;

export interface UserWithFollows extends CommonUser {
	followers: DefaultUser[];
	following: DefaultUser[];
}
