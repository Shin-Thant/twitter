import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import { Comment } from "../../../features/comment/types";
import CardButton from "../../buttons/CardButton";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";

type Props = {
	comments: Comment[];
	tweetId: string;
};

export default function TweetCommentBtn({ comments }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const { setIsOpen } = useTweetInfoModal();
	const isCommentedByLoginUser: boolean = loginUserId
		? !!comments.find((cmt) => cmt.creator._id === loginUserId)
		: false;

	const onComment = () => {
		if (!loginUserId) {
			setIsOpen(true);
			return;
		}

		return undefined;
	};

	return (
		<CardButton
			isLoading={false}
			label={comments.length}
			isDoneByLoginUser={isCommentedByLoginUser}
			type="comment"
			handleClick={onComment}
		>
			{isCommentedByLoginUser ? (
				<CommentFilledIcon fontSize="small" />
			) : (
				<CommentOutlinedIcon fontSize="small" />
			)}
		</CardButton>
	);
}
