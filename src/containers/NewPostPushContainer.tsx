import { Box } from "@mui/material";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { closeSnackbar } from "notistack";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { socket } from "../app/socket";
import { setTweetCurrentPage } from "../features/currentPageSlice";
import { GetTweetsQueryArg } from "../features/tweet/tweetApiSlice";
import { GetTweetsResult } from "../features/tweet/tweetTypes";
import { userIdSelector } from "../features/user/userSlice";
import { BaseQueryWithReauth } from "../lib/baseQueryWithReauth";
import { showNewPostNoti } from "../lib/handleToast";
import { PostNotiPayload } from "../components/feedbacks/Toast";

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
	const [notiPayloads, setNotiPayloads] = useState<PostNotiPayload[]>([]);

	const onToastClick = useCallback(
		(key: string | number) => {
			anchorEleRef.current?.scrollIntoView({ block: "end" });
			dispatch(setTweetCurrentPage(1));
			refetch();
			closeSnackbar(key);
		},
		[dispatch, refetch]
	);

	const showNoti = useCallback(() => {
		showNewPostNoti({ onToastClick, notiPayloads: [...notiPayloads] });
	}, [onToastClick, notiPayloads]);

	useEffect(() => {
		let isMounted = true;
		let timeoutId: NodeJS.Timeout | undefined;

		function onNewPostCreated(followingUser: PostNotiPayload) {
			setNotiPayloads((prev) => {
				const isExist = prev.some(
					(user) => user.id === followingUser.id
				);
				if (isExist) {
					return prev;
				}
				return [...prev, followingUser];
			});

			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				showNoti();
			}, 1000 * 10);
		}

		if (isMounted && !!userId) {
			socket.on("new-post", onNewPostCreated);
		}

		return () => {
			isMounted = false;
			socket.off("new-post", onNewPostCreated);
			clearTimeout(timeoutId);
		};
	}, [userId, showNoti]);

	return (
		<>
			<Box ref={anchorEleRef}></Box>
			{children}
		</>
	);
};
