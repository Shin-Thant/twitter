import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setAccessToken } from "../../features/auth/authSlice";
import {
	isResponseDataContainToken,
	isValidErrorData,
} from "../../helpers/errorHelpers";
import { RootState } from "../store";

const URL = "https://twitter-api-hj4f.onrender.com/api/v1" as const;

const baseQuery = fetchBaseQuery({
	baseUrl: URL,
	credentials: "include",
	prepareHeaders(headers, { getState }) {
		const state = getState() as RootState;
		const accessToken = state.auth.accessToken;

		if (accessToken) {
			console.log("setting token", accessToken);
			headers.set("Authorization", `Bearer ${accessToken}`);
		}
		return headers;
	},
});

type BaseQueryWithReauth = BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	object,
	FetchBaseQueryMeta
>;
const baseQueryWithReauth: BaseQueryWithReauth = async (
	args,
	api,
	extraOptions
) => {
	const response = await baseQuery(args, api, extraOptions);

	if (response.data || !response.error || response.error.status !== 403) {
		return response;
	}

	console.log("sending refresh token");
	const refreshResponse = await baseQuery("/auth/refresh", api, extraOptions);

	if (refreshResponse.error) {
		const err = refreshResponse.error;
		if (err.status === 403 && isValidErrorData(err.data)) {
			err.data.message = "Your login expired!";
		}
		return refreshResponse;
	}

	if (!isResponseDataContainToken(refreshResponse.data)) {
		return createFetchError();
	}

	const accessToken = refreshResponse.data.accessToken;
	api.dispatch(setAccessToken(accessToken));

	const remadeResponse = await baseQuery(args, api, extraOptions);
	console.log(remadeResponse);

	return remadeResponse;
};

function createFetchError() {
	return {
		error: {
			status: "FETCH_ERROR",
			error: "Something went wrong!",
		} as FetchBaseQueryError,
	};
}

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});

export default apiSlice;
