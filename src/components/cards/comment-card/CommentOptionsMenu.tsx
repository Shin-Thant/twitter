import CardOptionsMenu from "../components/CardOptionsMenu";

type Props = {
	commentId: string;
};

const CommentOptionsMenu = ({ commentId }: Props) => {
	const handleEditModal = () => {
		// open edit modal
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
