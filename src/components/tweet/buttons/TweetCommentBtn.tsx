import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import { Comment } from "../../../features/comment/types";
import CardButton from "../../buttons/CardButton";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";

type Props = {
	comments: Comment[];
	tweetId: string;
	userId: string | undefined;
};

export default function TweetCommentBtn({ comments, tweetId, userId }: Props) {
	const isCommented = userId
		? !!comments.find((cmt) => cmt.creator._id === userId)
		: false;
	const { setIsOpen } = useTweetInfoModal();

	const onComment = () => {
		if (!userId) {
			setIsOpen(true);
			return;
		}

		return undefined;
	};

	return (
		<CardButton
			isLoading={false}
			label={comments.length}
			isCompleted={isCommented}
			type="comment"
			handleClick={onComment}
		>
			{isCommented ? (
				<CommentFilledIcon fontSize="small" />
			) : (
				<CommentOutlinedIcon fontSize="small" />
			)}
		</CardButton>
	);
}
