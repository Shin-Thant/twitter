import useCommentDeleteModal from "../../../hooks/useCommentDeleteModal";
import useCommentEditModal from "../../../hooks/useCommentEditModal";
import CardOptionsMenu from "../components/CardOptionsMenu";

type Props = {
	tweetId: string;
	commentId: string;
	originId?: string;
};

const CommentOptionsMenu = ({ tweetId, commentId, originId }: Props) => {
	const openEditModal = useCommentEditModal().openModal;
	const openDeleteModal = useCommentDeleteModal().openModal;

	const handleEditModal = () => {
		openEditModal({ tweetId, commentId, originId });
	};
	const handleDeleteModal = () => {
		openDeleteModal({ commentId, tweetId, getRepliesCacheKey: originId });
	};

	return (
		<CardOptionsMenu
			handleEditModal={handleEditModal}
			handleDeleteModal={handleDeleteModal}
		/>
	);
};

export default CommentOptionsMenu;
