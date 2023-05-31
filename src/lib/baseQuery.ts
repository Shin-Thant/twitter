import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import URL from "../app/api/config";

export const baseQuery = fetchBaseQuery({
	baseUrl: URL,
	credentials: "include",
	prepareHeaders(headers, { getState }) {
		const state = getState() as RootState;
		const accessToken = state.auth.accessToken;

		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}
		return headers;
	},
});
