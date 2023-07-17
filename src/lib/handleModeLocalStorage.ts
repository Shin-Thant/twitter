import { Mode } from "../context/ColorModeContext";

const KEY = "mode" as const;

export function getModeFromLocalStorage() {
	return localStorage.getItem(KEY);
}
export function setModeToLocalStorage(newMode: Mode) {
	return localStorage.setItem(KEY, newMode);
}
