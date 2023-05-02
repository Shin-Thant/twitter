import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { User, setUser } from "../userSlice";
import apiSlice from "./apiSlice";
import isTokenErrorPayload from "../../helpers/isTokenErrorPayload";
import { setAccessToken } from "../authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

type SignUpResponse = User;
type SignUpBody = {
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
			queryFn: async (_arg, { dispatch }, _extraOptions, baseQuery) => {
				const accessToken = getToken();
				if (!accessToken) {
					return createFetchError("No access token!");
				}

				const bearerToken = `Bearer ${accessToken}`;
				const res = await baseQuery({
					url: "/users/me",
					headers: {
						Authorization: bearerToken,
					},
				});

				if (res.error) {
					if (isTokenErrorPayload(res.error)) {
						resetAuthAndUserState(dispatch);
					}
					return createFetchError(res.error);
				}
				const user = res.data as User;
				return { data: user };
			},
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
		}),
	}),
});

function getToken() {
	return localStorage.getItem("token");
}

function createFetchError(err: FetchBaseQueryError | string) {
	if (typeof err !== "string") {
		return { error: err };
	}
	const baseQueryError: FetchBaseQueryError = {
		status: "FETCH_ERROR",
		error: err,
	};
	return {
		error: baseQueryError,
	};
}

function resetAuthAndUserState(dispatch: ThunkDispatch<any, any, any>) {
	dispatch(setAccessToken(null));
	dispatch(setUser(null));
}

export const checkUserEndpoint = authApiSlice.endpoints.checkUser;

export const {
	useCheckUserQuery,
	useSignUpMutation,
	useLoginMutation,
	useLogoutMutation,
} = authApiSlice;
export default authApiSlice;
