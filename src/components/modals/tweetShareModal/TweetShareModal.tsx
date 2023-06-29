import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ReplyIcon from "@mui/icons-material/Reply";
import {
	Box,
	Button,
	Collapse,
	Divider,
	IconButton,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import {
	useHandleDeleteTweetMutation,
	useHandleShareMutation,
} from "../../../features/tweet/tweetApiSlice";
import TweetShareForm from "../../forms/TweetShareForm";
import Modal from "../Modal";
import { useAppSelector } from "../../../app/hooks";
import { userIdSelector } from "../../../features/user/userSlice";
import { SharedTweetPreview } from "../../../features/tweet/tweetTypes";
import { showToast } from "../../../lib/handleToast";

type Props = {
	tweetId: string;
	shares: SharedTweetPreview[];
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function TweetShareModal({
	tweetId,
	shares,
	isOpen,
	setIsOpen,
}: Props) {
	const [handleShare, { isLoading }] = useHandleShareMutation();
	const [handleDelete, { isLoading: isDeleting }] =
		useHandleDeleteTweetMutation();

	const userId = useAppSelector(userIdSelector);
	const [isQuoteTweet, setIsQuoteTweet] = useState(false);

	const isSharedWithoutBody = userId
		? shares.filter(
				(share) => !("body" in share)
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  ).length > 0
		: false;

	const retweet = () => {
		onShare();
		showSuccessToast();
		closeAndReset();
	};

	const quoteTweet = (body?: string) => {
		onShare(body);
		showSuccessToast();
		closeAndReset();
	};

	const undoRetweet = () => {
		onDelete();
		closeAndReset();
	};

	const onDelete = async () => {
		const sharedTweetWithoutBody = shares.filter(
			(share) => !("body" in share)
		);

		if (isDeleting && sharedTweetWithoutBody.length > 0) {
			return;
		}
		await handleDelete({ tweetId: sharedTweetWithoutBody[0]._id });
	};

	const onShare = async (body?: string) => {
		if (isLoading) {
			return;
		}
		await handleShare({ tweetId, body: body ?? "" });
	};

	const onClose = () => {
		if (isLoading || isDeleting) {
			return;
		}
		closeAndReset();
	};

	const showSuccessToast = () => {
		showToast({
			message: "Shared tweet successfully!",
			variant: "success",
		});
	};

	const closeAndReset = () => {
		setIsOpen(false);
		setIsQuoteTweet(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCustom={true}>
			<Box
				sx={{
					position: "absolute",
					top: { xs: "100%", ss: "50%" },
					left: "50%",
					width: { xs: "100%", ss: 450, sm: 500 },
					minHeight: 230,
					transform: {
						xs: "translate(-50%, -100%)",
						ss: "translate(-50%, -50%)",
					},
					bgcolor: "bg.navbar",
					boxShadow: 24,
					p: { xs: 2, ss: 4 },
					color: "text.primary",
					borderRadius: { xs: "10px 10px 0 0", ss: "10px" },
				}}
			>
				<Box
					mb={3}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h6">Retweet</Typography>
					<IconButton
						onClick={onClose}
						size="small"
						sx={{
							color: grey[700],
							transition: "color 200ms ease",
							"&:hover": {
								color: grey[300],
							},
						}}
					>
						<CloseRoundedIcon />
					</IconButton>
				</Box>

				<>
					{!isQuoteTweet && (
						<>
							{isSharedWithoutBody ? (
								<Button
									startIcon={<HistoryRoundedIcon />}
									onClick={undoRetweet}
									variant="outlined"
									fullWidth
									sx={{ textTransform: "none" }}
								>
									Undo retweet
								</Button>
							) : (
								<Button
									startIcon={<ReplyIcon />}
									onClick={retweet}
									variant="outlined"
									fullWidth
									sx={{ textTransform: "none" }}
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
								variant="contained"
								fullWidth
								sx={{ textTransform: "none" }}
							>
								Quote tweet
							</Button>
						</>
					)}

					<Collapse in={isQuoteTweet} timeout={500}>
						<TweetShareForm share={quoteTweet} />
					</Collapse>
				</>
			</Box>
		</Modal>
	);
}
