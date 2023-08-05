import { useTheme } from "@mui/material";

export function useThemeMode() {
	const mode = useTheme().palette.mode;
	return mode;
}
