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
import {
	getModeFromLocalStorage,
	setModeToLocalStorage,
} from "../lib/handleModeLocalStorage";

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
			const storedMode = getModeFromLocalStorage();
			if (!isValidColorMode(storedMode)) {
				setModeToLocalStorage("dark");
				return;
			}

			// set stored mode and system default theme states
			startTransition(() => {
				setMode(storedMode);
				setSystemMode(deviceTheme);
			});
		}
		return () => {
			isMounted = false;
		};
	}, [deviceTheme]);

	const changeMode = useCallback(
		(newMode: Mode) => {
			startTransition(() => {
				setMode(newMode);
				if (newMode === "system") {
					setSystemMode(deviceTheme);
				}
			});
			setModeToLocalStorage(newMode);
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
