import { useDeleteCommentMutation } from "../../features/comment/commentApiSlice";
import useCommentDeleteModal from "../../hooks/useCommentDeleteModal";
import { showToast } from "../../lib/handleToast";
import {
	isBaseQueryResponseError,
	isValidResponseErrorData,
} from "../../util/errorHelpers";
import ConfirmModal from "./ConfirmModal";

const CommentDeleteModal = () => {
	const [deleteComment, { isLoading }] = useDeleteCommentMutation();
	const {
		closeModal,
		commentId,
		tweetId,
		originIdOrGetRepliesCacheKey,
		isOpen,
	} = useCommentDeleteModal();

	const handleDelete = async () => {
		if (isLoading) return;
		try {
			const response = await deleteComment({
				commentId,
				tweetId,
				originIdOrGetRepliesCacheKey,
			});
			if (
				"error" in response &&
				isBaseQueryResponseError(response.error)
			) {
				if (isValidResponseErrorData(response.error.data)) {
					showToast({
						message: response.error.data.message,
						variant: "error",
					});
				} else {
					showToast({
						message: "Deleting comment failed!",
						variant: "error",
					});
				}
				closeModal();
				return;
			}

			closeModal();
		} catch (err) {
			console.error(err);
			showToast({
				message: "Deleting comment failed!",
				variant: "error",
			});
		}
	};

	return (
		<ConfirmModal
			title="Delete comment?"
			description="Are you sure do you want to delete this comment! This cannot be undone and it will be removed from your account and timeline."
			isOpen={isOpen}
			onClose={closeModal}
			actionLabel="Delete"
			action={handleDelete}
		/>
	);
};

export default CommentDeleteModal;
