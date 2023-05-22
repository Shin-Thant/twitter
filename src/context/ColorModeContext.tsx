import { ReactElement, createContext, useState } from "react";

type ColorMode = "light" | "dark";
export type Mode = ColorMode | "system";
type ThemeMode = {
	mode: Mode;
	systemMode: ColorMode;
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
	setSystemMode: React.Dispatch<React.SetStateAction<ColorMode>>;
};

export const ColorModeContext = createContext<ThemeMode>({
	mode: "system",
	systemMode: "dark",
	setMode: () => undefined,
	setSystemMode: () => undefined,
});

type Props = { children: ReactElement };
export default function ColorModeProvider({ children }: Props) {
	const [mode, setMode] = useState<Mode>("system");
	const [systemMode, setSystemMode] = useState<ColorMode>("dark");

	return (
		<ColorModeContext.Provider
			value={{ systemMode, setSystemMode, mode, setMode }}
		>
			{children}
		</ColorModeContext.Provider>
	);
}
