import BorderColorIcon from "@mui/icons-material/BorderColor";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button, Collapse, Divider, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
	useHandleDeleteTweetMutation,
	useHandleShareMutation,
} from "../../features/tweet/tweetApiSlice";
import { SharedTweetPreview } from "../../features/tweet/tweetTypes";
import { userIdSelector } from "../../features/user/userSlice";
import {
	isFetchBaseQueryError,
	isResponseError,
} from "../../helpers/errorHelpers";
import { showToast } from "../../lib/handleToast";
import TweetShareForm from "../forms/TweetShareForm";
import Modal from "./Modal";

function handleToast({ variant }: { variant: "success" | "error" }) {
	showToast({
		message:
			variant === "success"
				? "Successfully shared tweet!"
				: "Something went wrong!",
		variant,
	});
}

type Props = {
	tweetId: string;
	shares: SharedTweetPreview[];
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function TweetShareModal({
	tweetId,
	shares,
	isModalOpen,
	setIsModalOpen,
}: Props) {
	const [handleShare, { isLoading }] = useHandleShareMutation();
	const [handleDelete, { isLoading: isDeleting }] =
		useHandleDeleteTweetMutation();

	const userId = useAppSelector(userIdSelector);
	const [isQuoteTweet, setIsQuoteTweet] = useState(false);

	const isSharedWithoutBody = userId
		? shares.filter(
				(share) => !share.body
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  ).length > 0
		: false;

	const retweet = async () => {
		try {
			const response = await onShare();

			if (
				response &&
				"error" in response &&
				isFetchBaseQueryError(response.error) &&
				isResponseError(response.error)
			) {
				handleToast({ variant: "error" });
				closeAndReset();
				return;
			}

			handleToast({ variant: "success" });
			closeAndReset();
		} catch (err) {
			handleToast({ variant: "error" });
			closeAndReset();
		}
	};

	const quoteTweet = async (body?: string) => {
		try {
			const response = await onShare(body);

			if (
				response &&
				"error" in response &&
				isFetchBaseQueryError(response.error) &&
				isResponseError(response.error)
			) {
				showToast({
					message: "Something went wrong!",
					variant: "error",
				});
				closeAndReset();
				return;
			}

			handleToast({ variant: "success" });
			closeAndReset();
		} catch (err) {
			handleToast({ variant: "error" });
			closeAndReset();
		}
	};

	const undoRetweet = async () => {
		try {
			await onDelete();
			setIsModalOpen(false);
		} catch (err) {
			handleToast({ variant: "error" });
			setIsModalOpen(false);
		}
	};

	const onDelete = async () => {
		// TODO: review this
		const sharedTweetWithoutBody = shares.filter(
			(share) => !("body" in share)
		);

		if (isDeleting && sharedTweetWithoutBody.length > 0) {
			return;
		}
		return await handleDelete({
			tweetId: sharedTweetWithoutBody[0]._id,
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
		closeAndReset();
	};

	const closeAndReset = () => {
		setIsModalOpen(false);
		setIsQuoteTweet(false);
	};

	// TODO: fix the height bug
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
				<TweetShareForm share={quoteTweet} />
			</Collapse>
		</Modal>
	);
}

const btnStyles: SxProps<Theme> = {
	textTransform: 'none',
	py: 1
}