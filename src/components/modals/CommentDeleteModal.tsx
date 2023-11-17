import { useDeleteCommentMutation } from "../../features/comment/commentApiSlice";
import useCommentDeleteModal from "../../hooks/useCommentDeleteModal";
import { showToast } from "../../lib/handleToast";
import { useCommentThreadStore } from "../../pages/tweet-detail-page/store/CommentThreadStore";
import {
	isBaseQueryResponseError,
	isValidResponseErrorData,
} from "../../util/errorHelpers";
import ConfirmModal from "./ConfirmModal";

function showErrorToast(message?: string) {
	showToast({
		message: message ?? "Deleting comment failed!",
		variant: "error",
	});
}

const CommentDeleteModal = () => {
	const { threads, removeLastThread } = useCommentThreadStore();
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
			// to invalidate parent comment and its cache key
			const additionalCacheKeys = threads.reduce((acc, thread) => {
				if (thread.getRepliesCacheKey) {
					acc.push(thread.getRepliesCacheKey);
				}
				return acc;
			}, [] as string[]);

			const response = await deleteComment({
				commentId,
				tweetId,
				originIdOrGetRepliesCacheKey,
				additionalCacheKeys,
			});
			if ("data" in response) {
				return;
			}
			if (!isBaseQueryResponseError(response.error)) {
				showErrorToast();
				return;
			}
			if (isValidResponseErrorData(response.error.data)) {
				showErrorToast(response.error.data.message);
				return;
			}
			showErrorToast();
		} catch (err) {
			showErrorToast();
		} finally {
			closeModal();
			removeLastThread();
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
