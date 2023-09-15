import {
	ReactElement,
	createContext,
	startTransition,
	useCallback,
	useEffect,
	useState,
} from "react";
import isValidColorMode from "../util/isValidColorMode";
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
	changeMode: (newMode: Mode) => void;
};

const initValues: ContextState = {
	mode: "system",
	systemMode: "dark",
	setMode: () => undefined,
	changeMode: () => undefined,
};
export const ColorModeContext = createContext<ContextState>(initValues);

type Props = { children: ReactElement };

export default function ColorModeProvider({ children }: Props) {
	const [mode, setMode] = useState<Mode>("system");
	const deviceTheme = useDeviceTheme();
	// const [systemMode, setSystemMode] = useState<ColorMode>('dark')
	const systemMode: ColorMode = deviceTheme;

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			const storedMode = getModeFromLocalStorage();

			if (!isValidColorMode(storedMode)) {
				setModeToLocalStorage("dark");
				return;
			}

			// set stored mode
			setMode(storedMode);
		}

		return () => {
			isMounted = false;
		};
	}, [deviceTheme]);

	useEffect(() => {
		console.log("render");
	});

	const changeMode = useCallback((newMode: Mode) => {
		startTransition(() => {
			setMode(newMode);
		});
		setModeToLocalStorage(newMode);
	}, []);

	return (
		<ColorModeContext.Provider
			value={{ systemMode, mode, setMode, changeMode }}
		>
			{children}
		</ColorModeContext.Provider>
	);
}
