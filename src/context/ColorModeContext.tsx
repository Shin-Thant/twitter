import {
	ReactElement,
	createContext,
	startTransition,
	useCallback,
	useEffect,
	useState,
} from "react";
import isValidColorMode from "../helpers/isValidColorMode";
import useDeviceTheme from "../hooks/useDeviceTheme";
import { getStoredMode, setStoredMode } from "../lib/handleModeLocalStorage";

type ColorMode = "light" | "dark";
export type Mode = ColorMode | "system";
type ContextState = {
	mode: Mode;
	systemMode: ColorMode;
	setMode: React.Dispatch<React.SetStateAction<Mode>>;
	setSystemMode: React.Dispatch<React.SetStateAction<ColorMode>>;
	changeMode: (newMode: Mode) => void;
};

const initValues: ContextState = {
	mode: "system",
	systemMode: "dark",
	setMode: () => undefined,
	setSystemMode: () => undefined,
	changeMode: () => undefined,
};
export const ColorModeContext = createContext<ContextState>(initValues);

type Props = { children: ReactElement };
export default function ColorModeProvider({ children }: Props) {
	const [mode, setMode] = useState<Mode>("system");
	const [systemMode, setSystemMode] = useState<ColorMode>("dark");
	const deviceTheme = useDeviceTheme();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			const storedMode = getStoredMode();
			if (!storedMode || !isValidColorMode(storedMode)) {
				setStoredMode("dark");
				return;
			}
			startTransition(() => {
				setMode(storedMode);

				if (typeof window !== "undefined") {
					const wMode = window.matchMedia(
						"(prefers-color-scheme: dark)"
					).matches;
					setSystemMode(wMode ? "dark" : "light");
				}
			});
		}
		return () => {
			isMounted = false;
		};
	}, []);

	const changeMode = useCallback(
		(newMode: Mode) => {
			startTransition(() => {
				setMode(newMode);
				if (newMode === "system") {
					setSystemMode(deviceTheme);
				}
			});
			setStoredMode(newMode);
		},
		[deviceTheme]
	);

	return (
		<ColorModeContext.Provider
			value={{ systemMode, setSystemMode, mode, setMode, changeMode }}
		>
			{children}
		</ColorModeContext.Provider>
	);
}
