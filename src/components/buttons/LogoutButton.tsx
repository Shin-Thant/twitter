import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Button } from "@mui/material";
import useDrawerController from "../../hooks/useDrawerController";
import { useLogoutModal } from "../../hooks/useLogoutModal";

export default function LogoutButton() {
	const { setIsOpen: setDrawerOpen } = useDrawerController();
	const { setIsOpen: setModalOpen } = useLogoutModal();

	const handleClick = () => {
		setDrawerOpen(false);
		setModalOpen(true);
	};

	return (
		<Button
			onClick={handleClick}
			color="error"
			size="large"
			endIcon={<LogoutRoundedIcon />}
			sx={{
				borderRadius: "5px",
				textTransform: "none",
			}}
		>
			Logout
		</Button>
	);
}
