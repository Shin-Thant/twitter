import useCommentEditModal from "../../../hooks/useCommentEditModal";
import CardOptionsMenu from "../components/CardOptionsMenu";

type Props = {
	tweetId: string;
	commentId: string;
};

const CommentOptionsMenu = ({ tweetId, commentId }: Props) => {
	const openEditModal = useCommentEditModal().openModal;

	const handleEditModal = () => {
		openEditModal({ tweetId, commentId });
	};
	const handleDeleteModal = () => {
		// open delete modal
	};

	return (
		<CardOptionsMenu
			handleEditModal={handleEditModal}
			handleDeleteModal={handleDeleteModal}
		/>
	);
};

export default CommentOptionsMenu;
