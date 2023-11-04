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
	const [shareTweet, { isLoading: isSharing }] = useShareTweetMutation();
	const [deleteTweet, { isLoading: isDeleting }] = useDeleteTweetMutation();

	const [isQuoteTweet, setIsQuoteTweet] = useState(false);
	const {
		id: tweetId,
		isOpen: isModalOpen,
		closeModal,
	} = useTweetShareModal();

	const foundTweet = useAppSelector((state) =>
		!tweetId ? null : selectTweetFromGetTweets(state, tweetId)
	);
	const isSharedWithoutBody: boolean = foundTweet
		? !!foundTweet?.shares.find((share) => !share.body)
		: false;

	const retweet = async () => {
		try {
			const response = await shareTweet({ tweetId });

			if (checkResponseError(response)) {
				handleToast({ variant: "error" });
				onClose();
				return;
			}

			handleToast({ variant: "success" });
		} catch (err) {
			handleToast({ variant: "error" });
		} finally {
			onClose();
		}
	};

	const undoRetweet = async () => {
		try {
			await handleDelete();
		} catch (err) {
			handleToast({ variant: "error" });
		} finally {
			onClose();
		}
	};

	const handleDelete = async () => {
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
		if (isQuoteTweet) setIsQuoteTweet(false);
		closeModal();
	};

	const resetModalState = () => {
		setIsQuoteTweet(false);
	};

	return (
		<Modal title={"Retweet"} isOpen={isModalOpen} onClose={onClose}>
			{!isQuoteTweet && (
				<>
					{isSharedWithoutBody ? (
						<Button
							disabled={isDeleting}
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
							disabled={isSharing}
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
						disabled={isSharing}
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
				<TweetShareForm resetModalState={resetModalState} />
			</Collapse>
		</Modal>
	);
}

const btnStyles: SxProps<Theme> = {
	textTransform: "none",
	py: 1,
	borderRadius: { xs: "50px", ss: "8px" },
};
