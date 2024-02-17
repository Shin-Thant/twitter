import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { socket } from "../app/socket";
import { userIdSelector } from "../features/user/userSlice";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { GetTweetsQueryArg } from "../features/tweet/tweetApiSlice";
import { BaseQueryWithReauth } from "../lib/baseQueryWithReauth";
import { GetTweetsResult } from "../features/tweet/tweetTypes";

type Props = {
	refetch: () => QueryActionCreatorResult<
		QueryDefinition<
			GetTweetsQueryArg,
			BaseQueryWithReauth,
			| "Tweets"
			| "TweetDetails"
			| "Comments"
			| "CommentDetails"
			| "Replies"
			| "Notis",
			GetTweetsResult,
			"api"
		>
	>;
	children: ReactNode;
};

export const NewPostPushContainer = ({ refetch, children }: Props) => {
	const userId = useAppSelector(userIdSelector);

	useEffect(() => {
		let isMounted = true;
		let timeoutId: NodeJS.Timeout | undefined;

		function onNewPostCreated() {
			timeoutId = setTimeout(() => {
				refetch();
			}, 1000 * 60);
		}

		if (isMounted && !!userId) {
			socket.on("new-post", onNewPostCreated);
		}

		return () => {
			isMounted = false;
			socket.off("new-post", onNewPostCreated);
			clearTimeout(timeoutId);
		};
	}, [userId, refetch]);

	return <>{children}</>;
};
