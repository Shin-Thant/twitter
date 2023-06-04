import { Button, CardActions, ButtonBase, Typography } from "@mui/material";
import React, { startTransition, useState, useCallback } from "react";
import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilled from "@mui/icons-material/FavoriteRounded";
import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
	Tweet,
	useHandleLikesMutation,
} from "../../features/tweet/tweetApiSlice";
import { userIdSelector } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { grey, red } from "@mui/material/colors";
import CardButton from "../buttons/CardButton";

// TODO: create button which has initial color grey and when hover or click, change to specific color (red, blue, green)
type Props = {
	cacheKey: number;
	tweet: Tweet;
	comments: number;
	shares: number;
};
export default function TweetActions({
	cacheKey,
	tweet,
	comments,
	shares,
}: Props) {
	const [handleLike, { isLoading }] = useHandleLikesMutation();
	const userId = useAppSelector(userIdSelector);
	const [likes, setLikes] = useState(tweet.likes);
	const [isLiked, setIsLiked] = useState<boolean>(
		userId ? tweet.likes.includes(userId) : false
	);

	const onLike = useCallback(async () => {
		if (isLoading) return;

		if (!userId) {
			console.log("login first");
			return;
		}
		console.log({ userId });
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
				justifyContent: "space-between",
				ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" },
			}}
		>
			<CardButton
				label={likes.length}
				isCompleted={isLiked}
				type="like"
				handleClick={onLike}
			>
				{isLiked ? (
					<HeartFilled fontSize="small" />
				) : (
					<HeartOutlinedIcon fontSize="small" />
				)}
			</CardButton>
			{/* <ButtonBase
				onClick={onLike}
				sx={{
					display: "flex",
					alignItems: "center",
					gap: "0.3rem",
					p: "0.4rem 0.8rem",
					borderRadius: "5px",
					color: !isLiked ? grey[500] : red[500],
					"&:hover": {
						color: red[500],
						bgcolor: "hsl(0, 100%, 63%, 0.1)",
					},
					transition: "all 250ms ease",
				}}
				title="Likes"
			>
				{isLiked ? (
					<HeartFilled fontSize="small" />
				) : (
					<HeartOutlinedIcon fontSize="small" />
				)}
				<Typography
					component="p"
					variant="body2"
					sx={{ ml: "0.1rem", fontWeight: 500 }}
				>
					{likes.length}
				</Typography>
			</ButtonBase> */}
			<Button color="primary" startIcon={<CommentOutlinedIcon />}>
				{comments}
			</Button>
			<Button color="success" startIcon={<SharedOutlinedIcon />}>
				{shares}
			</Button>
		</CardActions>
	);
}
