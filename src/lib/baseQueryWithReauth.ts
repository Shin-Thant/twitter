import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { setAuth } from "../features/auth/authSlice";
import {
	createFetchError,
	isResponseDataContainToken,
	isValidResponseErrorData,
} from "../helpers/errorHelpers";
import { baseQuery } from "./baseQuery";

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

	// data exist, no error or error's status is 403
	if (response.data || !response.error || response.error.status !== 403) {
		return response;
	}

	// continue as the error's status is 403
	// getting refresh token
	const refreshResponse = await baseQuery("/auth/refresh", api, extraOptions);

	if (refreshResponse.error) {
		const err = refreshResponse.error;
		if (err.status === 403 && isValidResponseErrorData(err.data)) {
			err.data.message = "Your login expired!";
		}
		return refreshResponse;
	}

	if (!isResponseDataContainToken(refreshResponse.data)) {
		return createFetchError();
	}

	const accessToken = refreshResponse.data.accessToken;
	api.dispatch(setAuth(accessToken));

	const remadeResponse = await baseQuery(args, api, extraOptions);
	return remadeResponse;
};

export default baseQueryWithReauth;
