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

export type UserWithoutEmail = Omit<DefaultUser, "email">;

export interface GetMeResultUser extends CommonUser {
	followers: DefaultUser[];
	following: DefaultUser[];
}
