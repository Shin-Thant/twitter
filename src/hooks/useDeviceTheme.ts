import useMediaQuery from "@mui/material/useMediaQuery";

export default function useDeviceTheme() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	return prefersDarkMode ? "dark" : "light";
}
