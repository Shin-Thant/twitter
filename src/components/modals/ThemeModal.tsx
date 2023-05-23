import {
	Box,
	FormControlLabel,
	Modal,
	Radio,
	RadioGroup,
	Typography,
	styled,
} from "@mui/material";
import { ChangeEvent } from "react";
import useThemeModal from "../../hooks/useThemeModal";
import useColorMode from "../../hooks/useColorMode";
import isValidColorMode from "../../helpers/isValidColorMode";

const style = {
	position: "absolute",
	top: { xs: "100%", normal_sm: "50%" },
	left: "50%",
	transform: {
		xs: "translate(-50%, -100%)",
		normal_sm: "translate(-50%, -50%)",
	},
	width: { xs: "100%", normal_sm: 350, sm: 400 },
	bgcolor: "bg.navbar",
	boxShadow: 24,
	p: { xs: 2, normal_sm: 4 },
	color: "text.primary",
	borderRadius: { xs: "10px 10px 0 0", normal_sm: "10px" },
};

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

				<RadioGroup onChange={onModeChange} value={mode}>
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
