import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useThemeMode } from "../../hooks/useThemeMode";
import { ReactNode } from "react";

type Props = {
	title: string | ReactNode;
	closeModal: () => void;
};

interface Palette {
	color: string;
	hoverColor: string;
}
const LIGHT_PALETTE: Palette = {
	color: grey[400],
	hoverColor: grey[700],
};
const DARK_PALETTE: Palette = {
	color: grey[700],
	hoverColor: grey[300],
};

const ModalHeader = ({ title, closeModal }: Props) => {
	const isDarkMode = useThemeMode() === "dark";

	return (
		<Box
			mb={3}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Typography
				component={"h1"}
				sx={{ fontSize: { xs: "1.2rem", ss: "1.1rem" } }}
			>
				{title}
			</Typography>
			<IconButton
				onClick={closeModal}
				size="small"
				sx={{
					color: isDarkMode
						? DARK_PALETTE.color
						: LIGHT_PALETTE.color,
					"&:hover": {
						color: isDarkMode
							? DARK_PALETTE.hoverColor
							: LIGHT_PALETTE.hoverColor,
					},
					transition: "color 200ms ease",
				}}
			>
				<CloseRoundedIcon />
			</IconButton>
		</Box>
	);
};

export default ModalHeader;
