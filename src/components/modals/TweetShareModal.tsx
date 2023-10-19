import BorderColorIcon from "@mui/icons-material/BorderColor";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button, Collapse, Divider, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
	selectTweetFromGetTweets,
	useDeleteTweetMutation,
	useShareTweetMutation,
} from "../../features/tweet/tweetApiSlice";
import { useTweetShareModal } from "../../hooks/useTweetShareModal";
import { showToast } from "../../lib/handleToast";
import {
	BaseQueryResponseError,
	isBaseQueryResponseError,
} from "../../util/errorHelpers";
import TweetShareForm from "../forms/TweetShareForm";
import Modal from "./Modal";

// TODO: refactor error handlings

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
	const {
		id: tweetId,
		isOpen: isModalOpen,
		closeModal,
	} = useTweetShareModal();
	const [isQuoteTweet, setIsQuoteTweet] = useState(false);

	const foundTweet = useAppSelector((state) =>
		!tweetId ? null : selectTweetFromGetTweets(state, tweetId)
	);
	const isSharedWithoutBody: boolean = foundTweet
		? !!foundTweet?.shares.find((share) => !share.body)
		: false;

	const [shareTweet, { isLoading: isSharing }] = useShareTweetMutation();
	const [deleteTweet, { isLoading: isDeleting }] = useDeleteTweetMutation();

	const retweet = async () => {
		try {
			const response = await handleShare();

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
			const response = await handleShare(body);

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

	const handleShare = async (body?: string) => {
		if (isSharing) {
			return;
		}
		const requestBody = body ? { tweetId, body } : { tweetId };
		const res = await shareTweet(requestBody);
		return res;
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
		const sharedTweetWithoutBody = foundTweet
			? foundTweet?.shares.find((share) => !share.body)
			: undefined;

		if (isDeleting || !sharedTweetWithoutBody) {
			return;
		}
		return await deleteTweet({
			tweetId: sharedTweetWithoutBody._id,
		});
	};

	const onClose = () => {
		// if (isLoading || isDeleting) {
		// 	return;
		// }
		closeAndReset({ reset: true });
	};

	const closeAndReset = (option?: { reset: boolean }) => {
		if (option?.reset) {
			setIsQuoteTweet(false);
		}
		closeModal();
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
