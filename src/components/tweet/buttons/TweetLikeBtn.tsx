import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import { startTransition } from "react";
import { useAppSelector } from "../../../app/hooks";
import { currentPageSelector } from "../../../features/currentPageSlice";
import { useHandleLikesMutation } from "../../../features/tweet/tweetApiSlice";
import { userIdSelector } from "../../../features/user/userSlice";
import getUpdatedStringList from "../../../helpers/getUpdatedStringList";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import CardButton from "../../buttons/CardButton";

type Props = {
	likes: string[];
	tweetId: string;
};
export default function TweetLikeBtn({ likes, tweetId }: Props) {
	const currentPage = useAppSelector((state) =>
		currentPageSelector(state, "tweet")
	);
	const loginUserId = useAppSelector(userIdSelector);
	const [handleLike, { isLoading }] = useHandleLikesMutation();
	const { setIsOpen } = useTweetInfoModal();

	let isLiked = loginUserId ? likes.includes(loginUserId) : false;

	const onLike = async () => {
		if (isLoading) return;

		if (!loginUserId) {
			setIsOpen(true);
			return;
		}

		const updatedLikes = getUpdatedStringList(isLiked, likes, loginUserId);

		try {
			await handleLike({
				tweetId,
				likes: updatedLikes,
				cacheKey: currentPage,
			});

			startTransition(() => {
				isLiked = !isLiked;
			});
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<CardButton
			isLoading={isLoading}
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
	);
}
