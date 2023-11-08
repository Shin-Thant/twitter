import useCommentDeleteModal from "../../../hooks/useCommentDeleteModal";
import useCommentEditModal from "../../../hooks/useCommentEditModal";
import CardOptionsMenu from "../components/CardOptionsMenu";

type Props = {
	tweetId: string;
	commentId: string;
	originIdOrGetRepliesCacheKey?: string;
};

const CommentOptionsMenu = ({
	tweetId,
	commentId,
	originIdOrGetRepliesCacheKey,
}: Props) => {
	const openEditModal = useCommentEditModal().openModal;
	const openDeleteModal = useCommentDeleteModal().openModal;

	const handleEditModal = () => {
		openEditModal({
			tweetId,
			commentId,
			originIdOrGetRepliesCacheKey,
		});
	};
	const handleDeleteModal = () => {
		openDeleteModal({
			commentId,
			tweetId,
			originIdOrGetRepliesCacheKey,
		});
	};

	return (
		<CardOptionsMenu
			handleEditModal={handleEditModal}
			handleDeleteModal={handleDeleteModal}
		/>
	);
};

export default CommentOptionsMenu;
