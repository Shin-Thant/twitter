import BorderColorIcon from "@mui/icons-material/BorderColor";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button, Collapse, Divider, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
	selectTweetById,
	useHandleDeleteTweetMutation,
	useHandleShareMutation,
} from "../../features/tweet/tweetApiSlice";
import { SharedTweetPreview } from "../../features/tweet/tweetTypes";
import {
	BaseQueryResponseError,
	isBaseQueryResponseError,
} from "../../helpers/errorHelpers";
import { useTweetShareModal } from "../../hooks/useTweetShareModal";
import { showToast } from "../../lib/handleToast";
import TweetShareForm from "../forms/TweetShareForm";
import Modal from "./Modal";

function checkResponseError(
	response: object | undefined
): response is BaseQueryResponseError {
	return (
		!!response &&
		"error" in response &&
		isBaseQueryResponseError(response.error)
	);
}

function handleToast({ variant }: { variant: "success" | "error" }) {
	showToast({
		message:
			variant === "success"
				? "Successfully shared tweet!"
				: "Something went wrong!",
		variant,
	});
}

export default function TweetShareModal() {
	const { tweetId, isOpen: isModalOpen, closeModal } = useTweetShareModal();
	const [isQuoteTweet, setIsQuoteTweet] = useState(false);

	const foundTweet = useAppSelector((state) =>
		selectTweetById(state, tweetId)
	);
	const isSharedWithoutBody: boolean = foundTweet
		? !!foundTweet?.shares.find((share) => !share.body)
		: false;

	const [handleShare, { isLoading }] = useHandleShareMutation();
	const [handleDelete, { isLoading: isDeleting }] =
		useHandleDeleteTweetMutation();

	const retweet = async () => {
		try {
			const response = await onShare();

			if (checkResponseError(response)) {
				handleToast({ variant: "error" });
				closeAndReset();
				return;
			}

			handleToast({ variant: "success" });
		} catch (err) {
			handleToast({ variant: "error" });
		} finally {
			closeAndReset({ reset: false });
		}
	};

	const quoteTweet = async (body?: string) => {
		try {
			const response = await onShare(body);

			if (checkResponseError(response)) {
				showToast({
					message: "Something went wrong!",
					variant: "error",
				});
				closeAndReset();
				return;
			}

			handleToast({ variant: "success" });
		} catch (err) {
			handleToast({ variant: "error" });
		} finally {
			closeAndReset();
		}
	};

	const undoRetweet = async () => {
		try {
			await onDelete();
		} catch (err) {
			handleToast({ variant: "error" });
		} finally {
			closeAndReset({ reset: false });
		}
	};

	const onDelete = async () => {
		const sharedTweetWithoutBody: SharedTweetPreview | undefined =
			foundTweet
				? foundTweet?.shares.find((share) => !share.body)
				: undefined;

		if (isDeleting || !sharedTweetWithoutBody) {
			return;
		}
		return await handleDelete({
			tweetId: sharedTweetWithoutBody._id,
		});
	};

	const onShare = async (body?: string) => {
		if (isLoading) {
			return;
		}
		const res = await handleShare({ tweetId, body: body ?? "" });
		return res;
	};

	const onClose = () => {
		// if (isLoading || isDeleting) {
		// 	return;
		// }
		closeAndReset({ reset: true });
	};

	const closeAndReset = (option?: { reset: boolean }) => {
		closeModal();
		if (option?.reset) {
			setIsQuoteTweet(false);
		}
	};

	return (
		<Modal title={"Retweet"} isOpen={isModalOpen} onClose={onClose}>
			{!isQuoteTweet && (
				<>
					{isSharedWithoutBody ? (
						<Button
							startIcon={<HistoryRoundedIcon fontSize="small" />}
							onClick={undoRetweet}
							variant="outlined"
							fullWidth
							sx={btnStyles}
						>
							Undo retweet
						</Button>
					) : (
						<Button
							startIcon={<ReplyIcon fontSize="small" />}
							onClick={retweet}
							variant="outlined"
							fullWidth
							sx={btnStyles}
						>
							Retweet
						</Button>
					)}

					<Divider sx={{ my: "1rem" }}>or</Divider>

					<Button
						startIcon={<BorderColorIcon />}
						onClick={() => {
							setIsQuoteTweet((prev) => !prev);
						}}
						variant="outlined"
						fullWidth
						sx={btnStyles}
					>
						Quote tweet
					</Button>
				</>
			)}

			<Collapse in={isQuoteTweet} timeout={600}>
				<TweetShareForm handleShare={quoteTweet} closeModal={onClose} />
			</Collapse>
		</Modal>
	);
}

const btnStyles: SxProps<Theme> = {
	textTransform: "none",
	py: 1,
	borderRadius: { xs: "50px", ss: "8px" },
};
