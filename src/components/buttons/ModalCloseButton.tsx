import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useThemeMode } from "../../hooks/useThemeMode";

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

type Props = {
	onClose: () => void;
};

const ModalCloseButton = ({ onClose }: Props) => {
	const isDarkMode = useThemeMode() === "dark";

	return (
		<IconButton
			onClick={onClose}
			size="small"
			sx={{
				color: isDarkMode ? DARK_PALETTE.color : LIGHT_PALETTE.color,
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
	);
};

export default ModalCloseButton;
