import { Mode } from "../context/ColorModeContext";

const ALLOWED_MODES = ["dark", "light", "system"];

export default function isValidColorMode(mode: string): mode is Mode {
	return ALLOWED_MODES.indexOf(mode) !== -1;
}
