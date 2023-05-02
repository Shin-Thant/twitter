import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3500/api/v1",
		prepareHeaders(headers, { getState }) {
			const rootState = getState() as RootState;
			const accessToken = rootState.auth.accessToken;
			console.log("setting headers", accessToken);
			if (accessToken) {
				headers.set("Authorization", `Bearer ${accessToken}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});

export default apiSlice;
