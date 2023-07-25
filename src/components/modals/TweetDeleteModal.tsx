import React from "react";
import ConfirmModal from "./ConfirmModal";
import { useTweetDeleteModal } from "../../hooks/useTweetDeleteModal";
import { useHandleDeleteTweetMutation } from "../../features/tweet/tweetApiSlice";
import { showToast } from "../../lib/handleToast";

const TweetDeleteModal = () => {
	const { isOpen, tweetId, closeModal } = useTweetDeleteModal();
	const [deleteTweet, { isLoading }] = useHandleDeleteTweetMutation();

	const handleDelete = async () => {
		if (!tweetId || isLoading) return;

		try {
			await deleteTweet({ tweetId });

			showToast({
				message: "Successfully deleted tweet!",
				variant: "success",
			});
		} catch (err) {
			showToast({
				message: "Something went wrong!",
				variant: "error",
			});
		} finally {
			closeModal();
		}
	};

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
