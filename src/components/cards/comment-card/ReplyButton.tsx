import { useAppSelector } from "../../../app/hooks";
import { GetCommentsResultComment } from "../../../features/comment/commentTypes";
import { userIdSelector } from "../../../features/user/userSlice";
import { useReplyCreateModal } from "../../../hooks/useReplyCreateModal";
import CommentButton from "../../buttons/CommentButton";

type Props = {
	ownerId: string;
	commentId: string;
	tweetId: string;
	replies: GetCommentsResultComment["comments"][number][];
	// | { _id: string }
};

const ReplyButton = ({ tweetId, commentId, replies }: Props) => {
	const loginUserId = useAppSelector(userIdSelector);
	const isCommentedByLoginUser: boolean =
		!replies.length && !loginUserId
			? false
			: !!replies.find((reply) => reply.owner._id === loginUserId);

	const openModal = useReplyCreateModal().openModal;

	const openCommentModal = () => {
		openModal({ commentId: commentId, tweetId });
	};

	return (
		<CommentButton
			loginUserId={loginUserId}
			count={replies.length}
			isCommentedByLoginUser={isCommentedByLoginUser}
			openCommentModal={openCommentModal}
		/>
	);
};

export default ReplyButton;
