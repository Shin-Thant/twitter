import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
	Box,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	Typography,
	styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ChangeEvent, useCallback } from "react";
import isValidColorMode from "../../helpers/isValidColorMode";
import useColorMode from "../../hooks/useColorMode";
import useThemeModal from "../../hooks/useThemeModal";
import Modal from "./Modal";

export default function ThemeModal() {
	const { isOpen, setIsOpen } = useThemeModal();
	const { mode, changeMode } = useColorMode();

	const onModeChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedMode = e.target.value;

		if (!isValidColorMode(selectedMode)) {
			return;
		}

		changeMode(selectedMode);
	};

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Box
				mb={3}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6">Let's connect first!</Typography>
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

			<RadioGroup onChange={onModeChange} value={mode}>
				<Label value="light" label="Light" control={<Radio />} />
				<Label value="dark" label="Dark" control={<Radio />} />
				<Label value="system" label="System" control={<Radio />} />
			</RadioGroup>
		</Modal>
	);
}

const Label = styled(FormControlLabel)(({ theme }) => ({
	margin: "0px !important",
	justifyContent: "space-between",
	paddingRight: "0.8rem",
	borderRadius: "50px",
	[theme.breakpoints.up("xs")]: {
		opacity: 1,
	},
	[theme.breakpoints.up("sm")]: {
		opacity: 0.8,
	},
	"&:hover": {
		opacity: 1,
		backgroundColor:
			theme.palette.mode === "dark"
				? "hsl(0, 0%, 100%, 0.1)"
				: "hsl(0, 0%, 0%, 0.1)",
	},
}));
