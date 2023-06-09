import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import { startTransition, useState } from "react";
import { useHandleLikesMutation } from "../../../features/tweet/tweetApiSlice";
import getUpdatedStringList from "../../../helpers/getUpdatedStringList";
import useCurrentPage from "../../../hooks/useCurrentPage";
import CardButton from "../../buttons/CardButton";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";

type Props = {
	likes: string[];
	tweetId: string;
	userId: string | undefined;
};
export default function TweetLikeBtn({ likes, tweetId, userId }: Props) {
	const { currentPage } = useCurrentPage();
	const [handleLike, { isLoading }] = useHandleLikesMutation();
	const { setIsOpen } = useTweetInfoModal();

	const [isLiked, setIsLiked] = useState<boolean>(
		userId ? likes.includes(userId) : false
	);

	const onLike = async () => {
		if (isLoading) return;

		if (!userId) {
			setIsOpen(true);
			console.log("login first");
			return;
		}

		const updatedLikes = getUpdatedStringList(likes, userId);

		try {
			await handleLike({
				tweetId,
				likes: updatedLikes,
				cacheKey: currentPage,
			});

			startTransition(() => {
				setIsLiked((prev) => !prev);
			});
		} catch (err) {
			console.log(err);
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
