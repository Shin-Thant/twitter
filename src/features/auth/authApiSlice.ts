import apiSlice from "../../app/api/apiSlice";
import { GetMeResultUser, User } from "../user/userTypes";

type SignUpResponse = User;
export type SignUpBody = {
	username: string;
	name: string;
	email: string;
	password: string;
};

type LoginResponse = { accessToken: string; user: User };
type LoginBody = {
	email: string;
	password: string;
};

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		checkUser: builder.query<GetMeResultUser, void>({
			query: () => ({ url: "/users/me", timeout: 2 * 60 * 1000 }),
		}),

		signUp: builder.mutation<SignUpResponse, SignUpBody>({
			query: (arg) => ({
				url: "/auth/register",
				method: "POST",
				body: arg,
			}),
		}),

		login: builder.mutation<LoginResponse, LoginBody>({
			query: (arg) => ({
				url: "/auth/login",
				method: "POST",
				body: arg,
			}),
		}),

		logout: builder.mutation<void, void>({
			query: () => ({ url: "/auth/logout", method: "POST" }),
			invalidatesTags: [{ type: "Tweets", id: "LIST" }],
		}),
	}),
});

export const checkUserEndpoint = authApiSlice.endpoints.checkUser;

export const {
	useCheckUserQuery,
	useSignUpMutation,
	useLoginMutation,
	useLogoutMutation,
} = authApiSlice;
export default authApiSlice;
