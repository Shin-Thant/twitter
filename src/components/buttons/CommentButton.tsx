import CommentOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CommentFilledIcon from "@mui/icons-material/TextsmsRounded";
import { useTweetInfoModal } from "../../hooks/useTweetInfoModal";
import CardButton from "./CardButton";

type Props = {
	isCommentedByLoginUser?: boolean;
	count: number;
	openCommentModal: () => void;
};

const CommentButton = ({
	isCommentedByLoginUser,
	count,
	openCommentModal,
}: Props) => {
	const { setIsOpen: setIsInfoModalOpen } = useTweetInfoModal();

	const onComment = () => {
		if (!isCommentedByLoginUser) {
			setIsInfoModalOpen(true);
			return;
		}
		openCommentModal();
	};

	return (
		<CardButton
			isLoading={false}
			label={count}
			isDoneByLoginUser={isCommentedByLoginUser ?? false}
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
};

export default CommentButton;
