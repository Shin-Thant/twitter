import ConfirmModal from "./ConfirmModal";
import { useTweetDeleteModal } from "../../hooks/useTweetDeleteModal";
import { useHandleDeleteTweetMutation } from "../../features/tweet/tweetApiSlice";
import { showToast } from "../../lib/handleToast";
import {
	isBaseQueryResponseError,
	isValidResponseErrorData,
} from "../../util/errorHelpers";
import { useRedirectOnActionComplete } from "../../hooks/useRedirectOnActionComplete";

const TweetDeleteModal = () => {
	const { isOpen, id: tweetId, closeModal } = useTweetDeleteModal();
	const [deleteTweet, { isLoading }] = useHandleDeleteTweetMutation();
	const { redirectOnActionComplete } = useRedirectOnActionComplete();

	const handleDelete = async () => {
		if (!tweetId || isLoading) return;

		try {
			const result = await deleteTweet({ tweetId });

			if (
				"error" in result &&
				isBaseQueryResponseError(result.error) &&
				isValidResponseErrorData(result.error.data)
			) {
				showErrorToast(result.error.data.message);
				return;
			}

			showToast({
				message: "Successfully deleted tweet!",
				variant: "success",
			});

			closeModal();
			redirectOnActionComplete();
		} catch (err) {
			showErrorToast();
		}
	};

	function showErrorToast(message?: string) {
		showToast({
			message: message ?? "Something went wrong!",
			variant: "error",
		});
	}

	return (
		<ConfirmModal
			title="Delete tweet?"
			description="Are you sure do you want to delete this tweet! This cannot be undone and it will be removed from your account and timeline."
			isOpen={isOpen}
			onClose={closeModal}
			actionLabel="Delete"
			action={handleDelete}
		/>
	);
};

export default TweetDeleteModal;
