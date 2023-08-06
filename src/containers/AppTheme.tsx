import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useMemo } from "react";
import useColorMode from "../hooks/useColorMode";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
	interface Palette {
		bg: {
			main: string;
			navbar: string;
			auth: string;
		};
		tweet: {
			bg: string;
			borderColor: string;
		};
		option_icon: {
			normal: string;
			hover: string;
		};
		btn: {
			grey: { normal: string; hover: string };
		};
	}
	interface PaletteOptions {
		bg: {
			main: string;
			navbar: string;
			auth: string;
		};
		tweet: {
			bg: string;
			borderColor: string;
		};
		option_icon: {
			normal: string;
			hover: string;
		};
		btn: {
			grey: { normal: string; hover: string };
		};
	}

	interface PaletteColor {
		primary: { main: string; 100: string };
	}

	interface BreakpointOverrides {
		xs: true;
		normal_sm: true;
		ss: true;
		sm: true;
		mm: true;
		md: true;
		lg: true;
		xl: true;
	}
}

const breakpointValues = {
	xs: 0,
	normal_sm: 400,
	ss: 500,
	sm: 600,
	mm: 750,
	md: 900,
	lg: 1200,
	xl: 1536,
};

const darkModeColors = {
	bg: {
		main: "hsl(0, 0%, 0%)",
		navbar: "hsl(0, 0%, 5%)",
		auth: "hsl(0, 0%, 0%)",
	},
	text: {
		primary: "#fff",
		secondary: "hsl(207, 0%, 70%)",
	},
	tweet: {
		bg: "#000",
		borderColor: "hsl(0, 0%, 25%)",
	},
	option_icon: { normal: "hsl(0, 0%, 30%)", hover: "hsl(0, 0%, 70%)" },
	btn: {
		grey: { normal: grey[600], hover: grey[400] },
	},
};
const lightModeColors = {
	bg: {
		main: "hsl(0, 0%, 100%)",
		navbar: "hsl(0, 0%, 100%)",
		auth: "hsl(0, 0%, 100%)",
	},
	text: {
		primary: "#000",
		secondary: "hsl(207, 10%, 45%)",
	},
	tweet: {
		bg: "#fff",
		borderColor: "hsl(0, 0%, 65%)",
	},
	option_icon: { normal: "hsl(0, 0%, 70%)", hover: "hsl(0, 0%, 30%" },
	btn: {
		grey: { normal: grey[600], hover: grey[800] },
	},
};

// TODO: adjust `btn` color

type Props = { children: ReactNode };
export default function AppTheme({ children }: Props) {
	const { mode, systemMode } = useColorMode();

	const theme = useMemo(
		() =>
			createTheme({
				breakpoints: {
					values: breakpointValues,
				},
				palette: {
					mode: mode === "system" ? systemMode : mode,
					...(mode === "dark" ||
					(mode === "system" && systemMode === "dark")
						? darkModeColors
						: lightModeColors),
					primary: {
						100: "hsl(203, 100%, 55%)",
						main: "hsl(203, 100%, 47%)",
					},
				},
			}),
		[mode, systemMode]
	);

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
