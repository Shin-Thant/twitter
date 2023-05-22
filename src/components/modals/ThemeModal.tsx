import {
	Box,
	FormControlLabel,
	Modal,
	Radio,
	RadioGroup,
	Typography,
	styled,
} from "@mui/material";
import { ChangeEvent, startTransition } from "react";
import useThemeModal from "../../hooks/useThemeModal";
import { Mode } from "../../context/ColorModeContext";
import useColorMode from "../../hooks/useColorMode";
import useDeviceTheme from "../../hooks/useDeviceTheme";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "bg.navbar",
	boxShadow: 24,
	p: 4,
	color: "text.primary",
	borderRadius: "10px",
};

const ALLOWED_MODES = ["dark", "light", "system"];

function isValidMode(mode: string): mode is Mode {
	return ALLOWED_MODES.indexOf(mode) !== -1;
}

export default function ThemeModal() {
	const { isOpen, setIsOpen } = useThemeModal();
	const { mode, setMode, setSystemMode } = useColorMode();
	const deviceTheme = useDeviceTheme();

	const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedMode = e.target.value;

		if (!isValidMode(selectedMode)) {
			return;
		}

		startTransition(() => {
			if (selectedMode === "system") {
				setSystemMode(deviceTheme);
			}
			setMode(selectedMode);
		});
	};

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
			}}
			disableAutoFocus
			disableEnforceFocus
		>
			<Box sx={style}>
				<Typography variant="h6" component="h2" sx={{ mb: "1rem" }}>
					Theme
				</Typography>

				<RadioGroup onChange={onRadioChange} value={mode}>
					<Label value="light" label="Light" control={<Radio />} />
					<Label value="dark" label="Dark" control={<Radio />} />
					<Label value="system" label="System" control={<Radio />} />
				</RadioGroup>
			</Box>
		</Modal>
	);
}

const Label = styled(FormControlLabel)(({ theme }) => ({
	margin: "0px !important",
	justifyContent: "space-between",
	paddingRight: "0.8rem",
	borderRadius: "50px",
	"&:hover": {
		backgroundColor:
			theme.palette.mode === "dark"
				? "hsl(0, 0%, 100%, 0.1)"
				: "hsl(0, 0%, 0%, 0.1)",
	},
}));
