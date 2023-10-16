import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import { useAppSelector } from "../../../../app/hooks";
import { useHandleLikesMutation } from "../../../../features/tweet/tweetApiSlice";
import { userIdSelector } from "../../../../features/user/userSlice";
import { useTweetInfoModal } from "../../../../hooks/useTweetInfoModal";
import getUpdatedStringList from "../../../../util/getUpdatedStringList";
import CardButton from "../../../buttons/CardButton";

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
		} catch (err) {
			if (import.meta.env.VITE_ENV !== "production") {
				console.log({ error_in_like_update: err });
			}
			console.error(err);
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
