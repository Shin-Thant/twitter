import { useAppSelector } from "../../../app/hooks";
import { DefaultCommentWithPopulatedUser } from "../../../features/comment/commentTypes";
import { userIdSelector } from "../../../features/user/userSlice";
import { useReplyCreateModal } from "../../../hooks/useReplyCreateModal";
import CommentButton from "../../buttons/CommentButton";

type Props = {
	ownerId: string;
	commentId: string;
	tweetId: string;
	replies: DefaultCommentWithPopulatedUser[];
};

const ReplyButton = ({ tweetId, commentId, replies }: Props) => {
	const loginUserId = useAppSelector(userIdSelector);
	const isCommentedByLoginUser: boolean =
		!!replies.length && loginUserId
			? !!replies.find((reply) => reply.owner._id === loginUserId)
			: false;

	const openModal = useReplyCreateModal().openModal;

	const openCommentModal = () => {
		openModal({ originId: commentId, tweetId });
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
