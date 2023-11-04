import { Button, Stack, styled } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMAGE_URL } from "../../config";
import { useImageModal } from "../../hooks/useImageModal";
import ModalCloseButton from "../buttons/ModalCloseButton";
import Modal from "./Modal";
import { useEffect, useState } from "react";

const TWEET_DETAIL_PAGE_REGEX = /^\/tweet\/[a-zA-Z0-9]+$/;

const ImageModal = () => {
	const { isOpen, imageUrl, ownerTweetId, closeModal } = useImageModal();
	const [showGoToButton, setShowGoToButton] = useState<boolean>(false);

	const navigate = useNavigate();
	const currentPathName = useLocation().pathname;
	const currentTweetIdParam = useParams().id;

	useEffect(() => {
		if (isOpen) {
			if (!TWEET_DETAIL_PAGE_REGEX.test(currentPathName)) {
				setShowGoToButton(true);
				return;
			}

			if (currentTweetIdParam !== ownerTweetId) {
				setShowGoToButton(true);
			}
		}
	}, [isOpen, currentPathName, currentTweetIdParam, ownerTweetId]);

	const onNavigate = () => {
		navigate(`/tweet/${ownerTweetId}`);
		closeModal();
	};

	const onClose = () => {
		closeModal();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			modalStyle={{
				width: { xs: "100%", sm: "max-content" },
				height: { xs: "100%", sm: "max-content" },
				position: { xs: "relative", sm: "absolute" },
				borderRadius: { xs: 0, sm: "12px" },
				p: 2,
			}}
		>
			<Stack
				direction="row"
				justifyContent={!showGoToButton ? "flex-end" : "space-between"}
				sx={{ mb: 2 }}
			>
				{showGoToButton && (
					<Button
						variant="outlined"
						sx={{ borderRadius: "50px", textTransform: "none" }}
						onClick={onNavigate}
					>
						Go to post
					</Button>
				)}
				<ModalCloseButton onClose={onClose} />
			</Stack>

			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{
					width: { xs: "100%", sm: 500 },
					height: { xs: "calc(100% - 3rem)", sm: "max-content" },
					maxHeight: { xs: "calc(100% - 3rem)", sm: 500 },
				}}
			>
				<Image
					src={`${IMAGE_URL}/${imageUrl}`}
					alt={`Tweet image ${imageUrl}`}
				/>
			</Stack>
		</Modal>
	);
};

const Image = styled("img")(() => ({
	width: "100%",
	height: "100%",
	maxHeight: "500px",
	objectFit: "contain",
	borderRadius: "8px",
}));

export default ImageModal;
