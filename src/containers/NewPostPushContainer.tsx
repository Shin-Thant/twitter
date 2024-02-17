import { Box } from "@mui/material";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { closeSnackbar } from "notistack";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { socket } from "../app/socket";
import { setTweetCurrentPage } from "../features/currentPageSlice";
import { GetTweetsQueryArg } from "../features/tweet/tweetApiSlice";
import { GetTweetsResult } from "../features/tweet/tweetTypes";
import { userIdSelector } from "../features/user/userSlice";
import { BaseQueryWithReauth } from "../lib/baseQueryWithReauth";
import { showNewPostNoti } from "../lib/handleToast";

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
	const dispatch = useAppDispatch();
	const anchorEleRef = useRef<HTMLDivElement>(null);

	const onToastClick = useCallback(
		(key: string | number) => {
			anchorEleRef.current?.scrollIntoView({ block: "end" });
			dispatch(setTweetCurrentPage(1));
			refetch();
			closeSnackbar(key);
		},
		[dispatch, refetch]
	);

	useEffect(() => {
		let isMounted = true;
		let timeoutId: NodeJS.Timeout | undefined;

		function onNewPostCreated() {
			timeoutId = setTimeout(() => {
				showNewPostNoti({ onToastClick });
			}, 1000 * 30);
		}

		if (isMounted && !!userId) {
			socket.on("new-post", onNewPostCreated);
		}

		return () => {
			isMounted = false;
			socket.off("new-post", onNewPostCreated);
			clearTimeout(timeoutId);
		};
	}, [userId, refetch, onToastClick]);

	return (
		<>
			<Box ref={anchorEleRef}></Box>
			{children}
		</>
	);
};
