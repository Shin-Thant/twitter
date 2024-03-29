import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../lib/baseQueryWithReauth";

const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	tagTypes: [
		"Tweets",
		"TweetDetails",
		"Comments",
		"CommentDetails",
		"Replies",
	],
	endpoints: () => ({}),
});

export default apiSlice;
