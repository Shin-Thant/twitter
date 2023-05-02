import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import retriveToken from "../../helpers/retriveToken";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3500/api/v1",
		prepareHeaders(headers, _api) {
			const accessToken = retriveToken();

			if (accessToken) {
				console.log("setting token", accessToken);
				headers.set("Authorization", `Bearer ${accessToken}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({}),
});

export default apiSlice;
