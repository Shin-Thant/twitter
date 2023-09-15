import { FormControlLabel, Radio, RadioGroup, styled } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import isValidColorMode from "../../util/isValidColorMode";
import useColorMode from "../../hooks/useColorMode";
import useThemeModal from "../../hooks/useThemeModal";
import Modal from "./Modal";

const LIGHT_BG_COLOR = "#e5e5e5" as const;
const DARK_BG_COLOR = "#262626" as const;

export default function ThemeModal() {
	const { isOpen, setIsOpen } = useThemeModal();
	const { mode, changeMode, systemMode } = useColorMode();

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
		<Modal title={"Change Theme"} isOpen={isOpen} onClose={onClose}>
			<RadioGroup
				onChange={onModeChange}
				value={mode}
				sx={{ gap: "0.3rem" }}
			>
				<Label
					value="light"
					label="Light"
					control={<Radio />}
					sx={{
						bgcolor:
							mode === "light" ? LIGHT_BG_COLOR : "transparent",
					}}
				/>
				<Label
					value="dark"
					label="Dark"
					control={<Radio />}
					sx={{
						bgcolor:
							mode === "dark" ? DARK_BG_COLOR : "transparent",
					}}
				/>
				<Label
					value="system"
					label="System"
					control={<Radio />}
					sx={{
						bgcolor:
							mode === "system"
								? systemMode === "light"
									? LIGHT_BG_COLOR
									: DARK_BG_COLOR
								: "transparent",
					}}
				/>
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
