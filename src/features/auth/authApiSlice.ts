import apiSlice from "../../app/api/apiSlice";
import { User } from "../user/types";

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
		checkUser: builder.query<User, void>({
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
			invalidatesTags: ["Tweets"],
		}),

		logout: builder.mutation<void, void>({
			query: () => ({ url: "/auth/logout", method: "POST" }),
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
