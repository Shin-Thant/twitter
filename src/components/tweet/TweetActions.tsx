import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import { CardActions } from "@mui/material";
import { startTransition, useCallback, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useHandleLikesMutation } from "../../features/tweet/tweetApiSlice";
import { userIdSelector } from "../../features/user/userSlice";
import CardButton from "../buttons/CardButton";
import { Tweet } from "../../features/tweet/type";

// TODO: create button which has initial color grey and when hover or click, change to specific color (red, blue, green)
type Props = {
	cacheKey: number;
	tweet: Tweet;
};
export default function TweetActions({ cacheKey, tweet }: Props) {
	const [handleLike, { isLoading }] = useHandleLikesMutation();
	const userId = useAppSelector(userIdSelector);

	const [likes, setLikes] = useState(tweet.likes);
	const [isLiked, setIsLiked] = useState<boolean>(
		userId ? tweet.likes.includes(userId) : false
	);

	const [isCommented, setIsCommented] = useState<boolean>(
		userId
			? !!tweet.comments.find((cmt) => cmt.creator._id === userId)
			: false
	);

	const [isShared, setIsShared] = useState(
		tweet.owner._id === (userId ?? "")
	);

	const onLike = useCallback(async () => {
		if (isLoading) return;

		if (!userId) {
			console.log("login first");
			return;
		}
		const tweetId = tweet._id;

		const isLiked = tweet.likes.includes(userId);
		let updatedLikes: string[];

		if (isLiked) {
			// remove like
			updatedLikes = [...tweet.likes.filter((id) => id !== userId)];
		} else {
			// add like
			updatedLikes = [...tweet.likes, userId];
		}

		startTransition(() => {
			setIsLiked((prev) => !prev);
			setLikes(updatedLikes);
		});
		await handleLike({
			tweetId,
			likes: updatedLikes,
			cacheKey,
		});
	}, [cacheKey, handleLike, isLoading, tweet._id, tweet.likes, userId]);

	return (
		<CardActions
			sx={{
				pb: 0,
				justifyContent: "space-between",
				// ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" },
			}}
		>
			<CardButton
				label={likes.length}
				isCompleted={isLiked}
				type="like"
				handleClick={onLike}
			>
				{isLiked ? (
					<HeartFilledIcon fontSize="small" />
				) : (
					<HeartOutlinedIcon fontSize="small" />
				)}
			</CardButton>

			<CardButton
				label={tweet.comments.length}
				isCompleted={isCommented}
				type="comment"
				handleClick={() => undefined}
			>
				{isCommented ? (
					<CommentFilledIcon fontSize="small" />
				) : (
					<CommentOutlinedIcon fontSize="small" />
				)}
			</CardButton>

			<CardButton
				label={tweet.shares}
				isCompleted={isShared}
				type="share"
				handleClick={() => undefined}
			>
				{isShared ? (
					<ShareRoundedIcon fontSize="small" />
				) : (
					<SharedOutlinedIcon fontSize="small" />
				)}
			</CardButton>
		</CardActions>
	);
}
