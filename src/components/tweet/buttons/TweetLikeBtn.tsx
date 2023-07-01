import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import { startTransition } from "react";
import { useHandleLikesMutation } from "../../../features/tweet/tweetApiSlice";
import getUpdatedStringList from "../../../helpers/getUpdatedStringList";
import useCurrentPage from "../../../hooks/useCurrentPage";
import CardButton from "../../buttons/CardButton";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";

type Props = {
	likes: string[];
	tweetId: string;
};
export default function TweetLikeBtn({ likes, tweetId }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const { currentPage } = useCurrentPage();
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
