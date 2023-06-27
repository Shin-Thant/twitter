export type User = {
	_id: string;
	name: string;
	username: string;
	email: string;
	avatar?: string;
	followers: string[];
	following: string[];
	counts: {
		followers: number;
		following: number;
	};
	createdAt: string;
	updatedAt: string;
	id: string;
};
