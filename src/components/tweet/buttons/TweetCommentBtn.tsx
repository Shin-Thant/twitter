import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import { Comment } from "../../../features/comment/commentTypes";
import CardButton from "../../buttons/CardButton";
import { useTweetInfoModal } from "../../../hooks/useTweetInfoModal";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";
import { useCommentCreateModal } from "../../../hooks/useCommentCreateModal";
import { selectTweetById } from "../../../features/tweet/tweetApiSlice";
import { showToast } from "../../../lib/handleToast";

type Props = {
	comments: Comment[];
	tweetId: string;
};

export default function TweetCommentBtn({ tweetId, comments }: Props) {
	const foundTweet = useAppSelector((state) =>
		selectTweetById(state, tweetId)
	);

	const loginUserId = useAppSelector(userIdSelector);
	const isCommentedByLoginUser: boolean = loginUserId
		? !!comments.find((cmt) => cmt.creator._id === loginUserId)
		: false;

	const { setIsOpen: setIsInfoModalOpen } = useTweetInfoModal();
	const { openModal: openCommentModal } = useCommentCreateModal();

	const onComment = () => {
		if (!loginUserId) {
			setIsInfoModalOpen(true);
			return;
		}
		if (!foundTweet) {
			showToast({ message: "Something went wrong!", variant: "error" });
			return;
		}
		openCommentModal(tweetId);
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
