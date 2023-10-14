import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import { startTransition } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useHandleLikesMutation } from "../../../features/tweet/tweetApiSlice";
import { userIdSelector } from "../../../features/user/userSlice";
import getUpdatedStringList from "../../../util/getUpdatedStringList";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import CardButton from "../../buttons/CardButton";

type Props = {
	likes: string[];
	tweetId: string;
};
export default function TweetLikeBtn({ likes, tweetId }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const [handleLike, { isLoading }] = useHandleLikesMutation();
	const { setIsOpen } = useTweetInfoModal();

	const isLikedByLoginUser: boolean = loginUserId
		? likes.includes(loginUserId)
		: false;

	const onLike = async () => {
		if (isLoading) return;

		if (!loginUserId) {
			setIsOpen(true);
			return;
		}

		const updatedLikes = getUpdatedStringList({
			isAdded: isLikedByLoginUser,
			list: likes,
			newItem: loginUserId,
		});

		try {
			await handleLike({
				tweetId,
				likes: updatedLikes,
			});

			// startTransition(() => {
			// 	isLikedByLoginUser = !isLikedByLoginUser;
			// });
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<CardButton
			isLoading={isLoading}
			label={likes.length}
			isDoneByLoginUser={isLikedByLoginUser}
			type="like"
			handleClick={onLike}
		>
			{isLikedByLoginUser ? (
				<HeartFilledIcon fontSize="small" />
			) : (
				<HeartOutlinedIcon fontSize="small" />
			)}
		</CardButton>
	);
}
