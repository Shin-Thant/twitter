import { Button, CardActions } from "@mui/material";
import React from "react";
import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import HeartFilled from "@mui/icons-material/FavoriteRounded";
import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import SharedOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
	Tweet,
	useHandleLikesMutation,
} from "../../features/tweet/tweetApiSlice";
import { userIdSelector } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";

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
	const userId = useAppSelector(userIdSelector);
	const [handleLike, { isLoading }] = useHandleLikesMutation();

	const onHandleLike = async () => {
		if (!userId) {
			console.log("login first");
			return;
		}
		const tweetId = tweet._id;

		console.log({ likes: tweet.likes, userId });

		const isLiked = tweet.likes.includes(userId);
		let updatedLikes: string[];

		if (isLiked) {
			// remove like
			updatedLikes = [...tweet.likes.filter((id) => id !== userId)];
		} else {
			// add like
			updatedLikes = [...tweet.likes, userId];
		}
		const res = await handleLike({
			tweetId,
			likes: updatedLikes,
			cacheKey,
		});
		// console.log(res);
	};

	return (
		<CardActions
			sx={{
				justifyContent: "space-between",
				ml: { xs: 0, ss: "3.3rem", sm: "3.5rem" },
			}}
		>
			<Button
				onClick={onHandleLike}
				disabled={isLoading}
				color="error"
				startIcon={<HeartOutlinedIcon />}
				disableRipple
			>
				{tweet.likes.length}
			</Button>
			<Button color="primary" startIcon={<CommentOutlinedIcon />}>
				{comments}
			</Button>
			<Button color="success" startIcon={<SharedOutlinedIcon />}>
				{shares}
			</Button>
		</CardActions>
	);
}
