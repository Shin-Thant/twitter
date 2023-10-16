import { useAppSelector } from "../../../../app/hooks";
import { TweetDetailComment } from "../../../../features/tweet/tweetTypes";
import { userIdSelector } from "../../../../features/user/userSlice";
import { useCommentCreateModal } from "../../../../hooks/useCommentCreateModal";
import CommentButton from "../../../buttons/CommentButton";

type Props = {
	comments: TweetDetailComment[];
	tweetId: string;
};

export default function TweetCommentBtn({ tweetId, comments }: Props) {
	const loginUserId = useAppSelector(userIdSelector);
	const isCommentedByLoginUser: boolean =
		loginUserId && !!comments.length
			? !!comments.find((cmt) => cmt.owner._id === loginUserId)
			: false;

	const { openModal } = useCommentCreateModal();

	const openCommentModal = () => {
		openModal(tweetId);
	};

	return (
		<CommentButton
			loginUserId={loginUserId}
			isCommentedByLoginUser={isCommentedByLoginUser}
			count={comments.length}
			openCommentModal={openCommentModal}
		/>
	);
}
