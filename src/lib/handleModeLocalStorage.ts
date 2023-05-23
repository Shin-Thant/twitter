import { Mode } from "../context/ColorModeContext";

const KEY = "mode" as const;

export function getStoredMode() {
	return localStorage.getItem(KEY);
}
export function setStoredMode(newMode: Mode) {
	return localStorage.setItem(KEY, newMode);
}
