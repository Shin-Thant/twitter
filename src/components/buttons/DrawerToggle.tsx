import { IconButton } from "@mui/material";
import useDrawerController from "../../hooks/useDrawerController";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export default function DrawerToggle() {
	const { setIsOpen } = useDrawerController();
	const handleClick = () => {
		setIsOpen(true);
	};

	return (
		<IconButton
			onClick={handleClick}
			sx={{
				display: { xs: "inline-flex", md: "none" },
				"&:hover": {
					color: "primary.main",
				},
			}}
		>
			<MenuRoundedIcon
				sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" } }}
			/>
		</IconButton>
	);
}
