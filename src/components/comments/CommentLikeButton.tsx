import HeartOutlinedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartFilledIcon from "@mui/icons-material/FavoriteRounded";
import CardButton from "../buttons/CardButton";
import { useAppSelector } from "../../app/hooks";
import { userIdSelector } from "../../features/user/userSlice";
import { useLikeCommentMutation } from "../../features/comment/commentApiSlice";
import { useTweetInfoModal } from "../../hooks/useTweetInfoModal";
import getUpdatedStringList from "../../util/getUpdatedStringList";
import { useParams } from "react-router-dom";

type Props = {
	ownerId: string;
	commentId: string;
	likes: string[];
};

const CommentLikeButton = ({ ownerId, commentId, likes }: Props) => {
	const tweetId = useParams().id;
	const [handleLike, { isLoading }] = useLikeCommentMutation();

	const loginUserId = useAppSelector(userIdSelector);
	const isLikedByLoginUser = !likes.length ? false : loginUserId === ownerId;

	const { setIsOpen } = useTweetInfoModal();

	const onLike = async () => {
		try {
			if (isLoading) return;

			if (!loginUserId) {
				setIsOpen(true);
				return;
			}

			if (!tweetId) {
				console.error("No tweet id!");
				return;
			}

			const updatedLikes = getUpdatedStringList({
				isAdded: isLikedByLoginUser,
				list: likes,
				newItem: ownerId,
			});
			await handleLike({
				commentId,
				tweetId: tweetId ?? "",
				likes: updatedLikes,
			});
		} catch (err) {
			if (import.meta.env.VITE_ENV !== "production") {
				console.error(err);
				return;
			}
			console.error("Something went wrong!");
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
};

export default CommentLikeButton;
