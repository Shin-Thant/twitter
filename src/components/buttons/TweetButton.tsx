import { Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { authStatusSelector } from "../../features/auth/authSlice";
import { useTweetCreatorModal } from "../../hooks/useTweetCreatorModal";
import { useTweetInfoModal } from "../../hooks/useTweetInfoModal";

const TweetButton = () => {
	const authStatus = useAppSelector(authStatusSelector);
	const { setIsOpen: setIsCreatorModalOpen } = useTweetCreatorModal();
	const { setIsOpen: setIsInfoModalOpen } = useTweetInfoModal();

	const openModal = () => {
		if (authStatus !== "login") {
			setIsInfoModalOpen(true);
			return;
		}
		setIsCreatorModalOpen(true);
	};

	return (
		<Button
			fullWidth
			variant="contained"
			onClick={openModal}
			sx={{ textTransform: "none" }}
			disabled={authStatus === "loading"}
		>
			Tweet
		</Button>
	);
};

export default TweetButton;
