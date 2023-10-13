import { useAppSelector } from "../../app/hooks";
import { userIdSelector } from "../../features/user/userSlice";
import CommentButton from "../buttons/CommentButton";

type Props = {
	ownerId: string;
	commentId: string;
	tweetId: string;
	nestedCommentCount: number;
};

const ReplyButton = ({ nestedCommentCount, ownerId }: Props) => {
	const loginUserId = useAppSelector(userIdSelector);
	const isCommentedByLoginUser: boolean =
		nestedCommentCount > 0 ? loginUserId === ownerId : false;

	const openCommentModal = () => {
		//
	};

	return (
		<CommentButton
			count={nestedCommentCount}
			isCommentedByLoginUser={isCommentedByLoginUser}
			openCommentModal={openCommentModal}
		/>
	);
};

export default ReplyButton;
