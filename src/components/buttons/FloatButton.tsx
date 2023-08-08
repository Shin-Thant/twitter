import AddIcon from "@mui/icons-material/AddRounded";
import { Fab } from "@mui/material";
import { useTweetCreatorModal } from "../../hooks/useTweetCreatorModal";

const POSITION = { xs: 20, ss: 30 } as const;

const FloatButton = () => {
	const { setIsOpen: setIsModalOpen } = useTweetCreatorModal();

	const openModal = () => {
		setIsModalOpen(true);
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

export default FloatButton;
