import AddIcon from "@mui/icons-material/AddRounded";
import { Fab } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { authStatusSelector } from "../../features/auth/authSlice";
import { useTweetCreatorModal } from "../../hooks/useTweetCreatorModal";
import { useTweetInfoModal } from "../../hooks/useTweetInfoModal";

const POSITION = { xs: 20, ss: 30 } as const;

const FloatTweetButton = () => {
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
		<Fab
			color="primary"
			size="medium"
			onClick={openModal}
			sx={{
				display: { xs: "flex", md: "none" },
				position: "absolute",
				bottom: POSITION,
				right: POSITION,
			}}
		>
			<AddIcon />
		</Fab>
	);
};

export default FloatTweetButton;
